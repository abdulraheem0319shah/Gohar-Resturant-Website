"""
Gohar Restaurant - Flask Backend & Secure Admin System
Est. 1993 | Orangi Town, Karachi
"""

import os
import sys
import json
import uuid
import datetime
import re
import requests

# Ensure UTF-8 output on Windows terminals
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from flask import Flask, Response, request, jsonify, render_template, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from groq import Groq
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

# Load environment variables
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')
GROQ_MODEL = os.environ.get('GROQ_MODEL', 'openai/gpt-oss-120b')

groq_client = None
if GROQ_API_KEY:
    try:
        groq_client = Groq(api_key=GROQ_API_KEY)
    except Exception as e:
        print("[!] Could not initialize Groq client:", e)

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)
app.config['PUBLIC_BASE_URL'] = os.environ.get('PUBLIC_BASE_URL', '').rstrip('/')

# SQLite Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'gohar_restaurant.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or os.urandom(32)

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD')

db = SQLAlchemy(app)

# -------------------------------------------------------------
# Database Models
# -------------------------------------------------------------

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(30), unique=True, nullable=False)
    customer_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    address = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text, default='')
    items_json = db.Column(db.Text, nullable=False)  # JSON list of items
    subtotal = db.Column(db.Float, nullable=False, default=0.0)
    delivery_fee = db.Column(db.Float, nullable=False, default=0.0)
    total_price = db.Column(db.Float, nullable=False, default=0.0)
    payment_method = db.Column(db.String(50), default='Cash on Delivery')
    status = db.Column(db.String(30), default='Pending')  # Pending, Completed, Cancelled
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        try:
            items = json.loads(self.items_json)
        except Exception:
            items = []
        return {
            'id': self.id,
            'order_number': self.order_number,
            'customer_name': self.customer_name,
            'phone': self.phone,
            'address': self.address,
            'notes': self.notes,
            'items': items,
            'subtotal': self.subtotal,
            'delivery_fee': self.delivery_fee,
            'total_price': self.total_price,
            'payment_method': self.payment_method,
            'status': self.status,
            'created_at': self.created_at.strftime('%Y-%m-%d %I:%M %p') if self.created_at else ''
        }

class TableBooking(db.Model):
    __tablename__ = 'table_bookings'
    id = db.Column(db.Integer, primary_key=True)
    booking_code = db.Column(db.String(30), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    date = db.Column(db.String(30), nullable=False)
    time = db.Column(db.String(30), nullable=False)
    guests = db.Column(db.Integer, nullable=False, default=2)
    special_requests = db.Column(db.Text, default='')
    status = db.Column(db.String(30), default='Pending')  # Pending, Approved, Cancelled
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'booking_code': self.booking_code,
            'name': self.name,
            'phone': self.phone,
            'date': self.date,
            'time': self.time,
            'guests': self.guests,
            'special_requests': self.special_requests,
            'status': self.status,
            'created_at': self.created_at.strftime('%Y-%m-%d %I:%M %p') if self.created_at else ''
        }

class CustomerReview(db.Model):
    __tablename__ = 'customer_reviews'
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.strftime('%Y-%m-%d') if self.created_at else ''
        }

class DishLike(db.Model):
    __tablename__ = 'dish_likes'
    __table_args__ = (db.UniqueConstraint('dish_id', 'visitor_id', name='uq_dish_like_visitor'),)

    id = db.Column(db.Integer, primary_key=True)
    dish_id = db.Column(db.Integer, nullable=False, index=True)
    visitor_id = db.Column(db.String(36), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)

class CustomerAccount(db.Model):
    __tablename__ = 'customer_accounts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(254), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    def public_profile(self):
        return {'id': self.id, 'name': self.name, 'email': self.email}

# -------------------------------------------------------------
# Restaurant Knowledge Base (For Gohar Assistant & FAQs)
# -------------------------------------------------------------
RESTAURANT_INFO = {
    "name": "Gohar Restaurant (گوھر ریسٹورینٹ)",
    "tagline": "Authentic Taste of Karachi Since 1993",
    "address": "Iqbal Market Road, Sector #11, Near Khuda Buksh Bakers, Orangi Town, Karachi, Pakistan",
    "phone": "03339229300",
    "whatsapp": "https://wa.me/923339229300",
    "timings": "Saturday – Thursday: 1:00 PM – 1:00 AM | Friday: 2:00 PM – 1:00 AM",
    "popular_items": [
        "Oreo Shake (PKR 320)", "Chicken Masala Rice (PKR 450)", "Crispy Broast Leg (PKR 490)",
        "Gohar Special Falooda (PKR 380)", "Pista Ice Cream (PKR 250)", "Zinger Cheese Burger (PKR 420)",
        "Chicken Chow Mein (PKR 550)", "Mirchi Vada with Tea & Raita (PKR 220)", "French Fries (PKR 220)",
        "Broasted Chicken (PKR 520)", "Sandwich & Salad (PKR 360)", "Chocolate Milkshake (PKR 300)",
        "Zinger Burger & Fries (PKR 490)", "Fried Kabab (PKR 420)", "Chicken Do Pyaza (PKR 780)",
        "Special Lassi (PKR 200)", "Magaz Fried (PKR 750)", "Tikka & Paratha (PKR 460)", "Dhaga Kabab (PKR 520)"
    ],
    "categories": [
        "BAR B Q (Tikka, Bihari Boti, Malai Boti, Seekh/Dhaga/Chandan Kababs)",
        "BURGERS & SANDWICHES (Zinger, Jumbo, Grilled, Beef)",
        "CHINESE & RICE (Kung Pao, Szechuan, Manchurian, Chow Mein, Singaporean Rice)",
        "BROAST (QTR Leg/Chest, Crispy Leg/Chest)",
        "KARAHI & HANDI (Beef/Chik Karahi, Achari/Makhni Handi)",
        "PLATTERS (Gohar Special 3-4 Person, BBQ Platter)",
        "SHAKES & DESSERTS (Mocktails, Shakes, Falooda, Ice Creams)"
    ],
    "delivery": "Fast home delivery across Orangi Town, Banaras, Site area, and adjacent sectors. Delivery fee is PKR 100 (Free delivery on orders over PKR 1,500)."
}

# -------------------------------------------------------------
# Frontend & Secure Admin Routes
# -------------------------------------------------------------

def public_base_url():
    return app.config['PUBLIC_BASE_URL'] or request.url_root.rstrip('/')

@app.route('/robots.txt')
def robots_txt():
    sitemap_url = f'{public_base_url()}/sitemap.xml'
    return Response(
        f'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: {sitemap_url}\n',
        mimetype='text/plain'
    )

@app.route('/sitemap.xml')
def sitemap_xml():
    base_url = public_base_url()
    public_pages = ('', 'popular', 'menu', 'about', 'reviews')
    locations = ''.join(
        f'<url><loc>{base_url}/{page}</loc></url>'
        for page in public_pages
    )
    return Response(
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f'{locations}</urlset>',
        mimetype='application/xml'
    )

@app.route('/')
def home():
    return render_template('index.html', page='home')

@app.route('/popular')
def popular_page():
    return render_template('index.html', page='popular')

@app.route('/menu')
def menu_page():
    return render_template('index.html', page='menu')

@app.route('/about')
def about_page():
    return render_template('index.html', page='about')

@app.route('/reviews')
def reviews_page():
    try:
        reviews = CustomerReview.query.order_by(CustomerReview.created_at.desc()).limit(100).all()
        average_rating = db.session.query(db.func.avg(CustomerReview.rating)).scalar() or 0
        review_count = CustomerReview.query.count()
        return render_template(
            'index.html',
            page='reviews',
            reviews=[review.to_dict() for review in reviews],
            average_rating=round(average_rating, 1),
            review_count=review_count
        )
    except Exception:
        app.logger.exception('Could not load customer reviews')
        return jsonify({'success': False, 'error': 'Could not load reviews'}), 500

@app.route('/admin')
def admin_page():
    # Admin page with integrated login guard
    is_authenticated = session.get('admin_logged_in', False)
    return render_template('admin.html', is_authenticated=is_authenticated)

def customer_account_response(account):
    session['customer_account_id'] = account.id
    return jsonify({
        'success': True,
        'message': 'Signed in successfully.',
        'account': account.public_profile()
    })

@app.route('/api/customer/account', methods=['GET'])
def customer_account_status():
    account_id = session.get('customer_account_id')
    if not account_id:
        return jsonify({'authenticated': False})

    account = db.session.get(CustomerAccount, account_id)
    if not account:
        session.pop('customer_account_id', None)
        return jsonify({'authenticated': False})
    return jsonify({'authenticated': True, 'account': account.public_profile()})

@app.route('/api/customer/register', methods=['POST'])
def customer_register():
    data = request.get_json(silent=True) or {}
    if not isinstance(data, dict):
        return jsonify({'success': False, 'error': 'Invalid account details.'}), 400
    name_value = data.get('name', '')
    email_value = data.get('email', '')
    password = data.get('password', '')

    if not isinstance(name_value, str) or not isinstance(email_value, str):
        return jsonify({'success': False, 'error': 'Enter a valid name and email address.'}), 400
    name = name_value.strip()
    email = email_value.strip().lower()
    if not name or len(name) > 100:
        return jsonify({'success': False, 'error': 'Enter your name (up to 100 characters).'}), 400
    if len(email) > 254 or not re.fullmatch(r'[^@\s]+@[^@\s]+\.[^@\s]+', email):
        return jsonify({'success': False, 'error': 'Enter a valid email address.'}), 400
    if not isinstance(password, str) or len(password) < 8 or len(password) > 128:
        return jsonify({'success': False, 'error': 'Password must be between 8 and 128 characters.'}), 400

    account = CustomerAccount(
        name=name,
        email=email,
        password_hash=generate_password_hash(password)
    )
    db.session.add(account)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'success': False, 'error': 'An account with this email already exists.'}), 409
    except Exception:
        db.session.rollback()
        app.logger.exception('Could not create customer account')
        return jsonify({'success': False, 'error': 'Could not create your account. Please try again.'}), 500

    return customer_account_response(account), 201

@app.route('/api/customer/login', methods=['POST'])
def customer_login():
    data = request.get_json(silent=True) or {}
    if not isinstance(data, dict):
        return jsonify({'success': False, 'error': 'Enter your email and password.'}), 400
    email_value = data.get('email', '')
    password = data.get('password', '')
    if not isinstance(email_value, str) or not isinstance(password, str):
        return jsonify({'success': False, 'error': 'Enter your email and password.'}), 400
    email = email_value.strip().lower()
    if not email or len(email) > 254 or not password:
        return jsonify({'success': False, 'error': 'Enter your email and password.'}), 400

    account = CustomerAccount.query.filter_by(email=email).first()
    if not account or not check_password_hash(account.password_hash, password):
        return jsonify({'success': False, 'error': 'Email or password is incorrect.'}), 401
    return customer_account_response(account)

@app.route('/api/customer/logout', methods=['POST'])
def customer_logout():
    session.pop('customer_account_id', None)
    return jsonify({'success': True, 'message': 'Signed out successfully.'})

# Admin Auth API
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json() or {}
    password = data.get('password', '').strip()
    if password == ADMIN_PASSWORD:
        session['admin_logged_in'] = True
        return jsonify({'success': True, 'message': 'Welcome to Gohar Restaurant Admin Panel'})
    return jsonify({'success': False, 'error': 'Invalid admin password'}), 401

@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    session.pop('admin_logged_in', None)
    return jsonify({'success': True, 'message': 'Logged out successfully'})

@app.route('/api/admin/check-auth', methods=['GET'])
def check_auth():
    return jsonify({'authenticated': session.get('admin_logged_in', False)})

# Helper to check auth
def is_admin():
    return session.get('admin_logged_in', False)

# -------------------------------------------------------------
# Customer Order & Booking APIs
# -------------------------------------------------------------

@app.route('/api/order', methods=['POST'])
def place_order():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'Invalid request data'}), 400

        customer_name = data.get('customer_name', '').strip()
        phone = data.get('phone', '').strip()
        address = data.get('address', '').strip()
        items = data.get('items', [])
        notes = data.get('notes', '').strip()
        delivery_fee = float(data.get('delivery_fee', 100))

        if not customer_name or not phone or not address:
            return jsonify({'success': False, 'error': 'Name, phone number, and address are required'}), 400

        if not items or len(items) == 0:
            return jsonify({'success': False, 'error': 'Your cart is empty'}), 400

        subtotal = sum(float(item.get('price', 0)) * int(item.get('qty', 1)) for item in items)
        if subtotal >= 1500:
            delivery_fee = 0.0
        total_price = subtotal + delivery_fee

        import random
        random_suffix = random.randint(1000, 9999)
        order_number = f"GOHAR-{random_suffix}"

        order = Order(
            order_number=order_number,
            customer_name=customer_name,
            phone=phone,
            address=address,
            notes=notes,
            items_json=json.dumps(items),
            subtotal=subtotal,
            delivery_fee=delivery_fee,
            total_price=total_price,
            payment_method=data.get('payment_method', 'Cash on Delivery'),
            status='Pending'
        )

        db.session.add(order)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Order placed successfully! Gohar Restaurant will prepare it shortly.',
            'order': order.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/book', methods=['POST'])
def book_table():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'Invalid data'}), 400

        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        date = data.get('date', '').strip()
        time = data.get('time', '').strip()
        guests = int(data.get('guests', 2))
        special_requests = data.get('special_requests', '').strip()

        if not name or not phone or not date or not time:
            return jsonify({'success': False, 'error': 'All booking fields are required'}), 400

        import random
        booking_code = f"TBL-{random.randint(100, 999)}"

        booking = TableBooking(
            booking_code=booking_code,
            name=name,
            phone=phone,
            date=date,
            time=time,
            guests=guests,
            special_requests=special_requests,
            status='Pending'
        )

        db.session.add(booking)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': f"Table reservation requested! Reference code: {booking_code}.",
            'booking': booking.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/reviews', methods=['GET', 'POST'])
def customer_reviews():
    if request.method == 'GET':
        try:
            reviews = CustomerReview.query.order_by(CustomerReview.created_at.desc()).limit(100).all()
            average_rating = db.session.query(db.func.avg(CustomerReview.rating)).scalar() or 0
            return jsonify({
                'success': True,
                'reviews': [review.to_dict() for review in reviews],
                'average_rating': round(average_rating, 1),
                'review_count': CustomerReview.query.count()
            })
        except Exception:
            app.logger.exception('Could not retrieve customer reviews')
            return jsonify({'success': False, 'error': 'Could not load reviews'}), 500

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({'success': False, 'error': 'Please submit a valid review'}), 400

    customer_name = data.get('customer_name')
    comment = data.get('comment')
    rating = data.get('rating')
    if not isinstance(customer_name, str) or not isinstance(comment, str):
        return jsonify({'success': False, 'error': 'Name and comment are required'}), 400
    customer_name = customer_name.strip()
    comment = comment.strip()
    if not customer_name or len(customer_name) > 50:
        return jsonify({'success': False, 'error': 'Name must be between 1 and 50 characters'}), 400
    if not comment or len(comment) > 300:
        return jsonify({'success': False, 'error': 'Comment must be between 1 and 300 characters'}), 400
    if isinstance(rating, bool) or not isinstance(rating, int) or rating < 1 or rating > 5:
        return jsonify({'success': False, 'error': 'Please select a rating from 1 to 5 stars'}), 400

    try:
        review = CustomerReview(customer_name=customer_name, rating=rating, comment=comment)
        db.session.add(review)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Thank you! Your review has been shared.',
            'review': review.to_dict()
        }), 201
    except Exception:
        db.session.rollback()
        app.logger.exception('Could not save customer review')
        return jsonify({'success': False, 'error': 'Could not save your review. Please try again.'}), 500

@app.route('/api/dishes/likes', methods=['GET', 'POST'])
def dish_likes():
    data = request.get_json(silent=True) if request.method == 'POST' else {}
    visitor_id = data.get('visitor_id') if isinstance(data, dict) else request.args.get('visitor_id')
    try:
        visitor_id = str(uuid.UUID(visitor_id)) if visitor_id else None
    except (ValueError, AttributeError, TypeError):
        return jsonify({'success': False, 'error': 'Invalid visitor ID'}), 400

    if request.method == 'GET':
        try:
            counts = db.session.query(DishLike.dish_id, db.func.count(DishLike.id)).group_by(DishLike.dish_id).all()
            liked_ids = []
            if visitor_id:
                liked_ids = [
                    dish_id for (dish_id,) in db.session.query(DishLike.dish_id)
                    .filter_by(visitor_id=visitor_id).all()
                ]
            return jsonify({
                'success': True,
                'likes': {str(dish_id): count for dish_id, count in counts},
                'liked_dish_ids': liked_ids
            })
        except Exception:
            app.logger.exception('Could not load dish likes')
            return jsonify({'success': False, 'error': 'Could not load dish likes'}), 500

    dish_id = data.get('dish_id') if isinstance(data, dict) else None
    if isinstance(dish_id, bool) or not isinstance(dish_id, int) or not 1 <= dish_id <= 9999:
        return jsonify({'success': False, 'error': 'Invalid dish'}), 400
    if not visitor_id:
        return jsonify({'success': False, 'error': 'A valid visitor ID is required'}), 400

    try:
        like = DishLike.query.filter_by(dish_id=dish_id, visitor_id=visitor_id).first()
        if like is None:
            db.session.add(DishLike(dish_id=dish_id, visitor_id=visitor_id))
            db.session.commit()
    except IntegrityError:
        db.session.rollback()
    except Exception:
        db.session.rollback()
        app.logger.exception('Could not save dish like')
        return jsonify({'success': False, 'error': 'Could not save your like. Please try again.'}), 500

    try:
        like_count = DishLike.query.filter_by(dish_id=dish_id).count()
        return jsonify({
            'success': True,
            'liked': True,
            'like_count': like_count,
            'dish_id': dish_id
        })
    except Exception:
        app.logger.exception('Could not retrieve updated dish like count')
        return jsonify({'success': False, 'error': 'Could not retrieve the like count'}), 500

# -------------------------------------------------------------
# Protected Admin Data Endpoints
# -------------------------------------------------------------

@app.route('/api/orders', methods=['GET'])
def get_orders():
    if not is_admin():
        return jsonify({'success': False, 'error': 'Unauthorized. Please login.'}), 401
    try:
        status_filter = request.args.get('status')
        query = Order.query.order_by(Order.created_at.desc())
        if status_filter and status_filter.lower() != 'all':
            query = query.filter_by(status=status_filter)
        orders = query.all()
        return jsonify({
            'success': True,
            'orders': [o.to_dict() for o in orders]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/order/<int:order_id>/status', methods=['POST'])
def update_order_status(order_id):
    if not is_admin():
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    try:
        data = request.get_json() or {}
        new_status = data.get('status', '').strip()
        if new_status not in ['Pending', 'Completed', 'Cancelled']:
            return jsonify({'success': False, 'error': 'Invalid status'}), 400

        order = Order.query.get(order_id)
        if not order:
            return jsonify({'success': False, 'error': 'Order not found'}), 404

        order.status = new_status
        db.session.commit()
        return jsonify({
            'success': True,
            'message': f"Order #{order.order_number} marked as {new_status}",
            'order': order.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    if not is_admin():
        return jsonify({'success': False, 'error': 'Unauthorized. Please login.'}), 401
    try:
        bookings = TableBooking.query.order_by(TableBooking.created_at.desc()).all()
        return jsonify({
            'success': True,
            'bookings': [b.to_dict() for b in bookings]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/booking/<int:booking_id>/status', methods=['POST'])
def update_booking_status(booking_id):
    if not is_admin():
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    try:
        data = request.get_json() or {}
        new_status = data.get('status', '').strip()
        if new_status not in ['Pending', 'Approved', 'Cancelled']:
            return jsonify({'success': False, 'error': 'Invalid status'}), 400

        booking = TableBooking.query.get(booking_id)
        if not booking:
            return jsonify({'success': False, 'error': 'Booking not found'}), 404

        booking.status = new_status
        db.session.commit()
        return jsonify({
            'success': True,
            'message': f"Booking #{booking.booking_code} marked as {new_status}",
            'booking': booking.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/stats', methods=['GET'])
def get_admin_stats():
    if not is_admin():
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    try:
        total_orders = Order.query.count()
        pending_orders = Order.query.filter_by(status='Pending').count()
        completed_orders = Order.query.filter_by(status='Completed').count()
        cancelled_orders = Order.query.filter_by(status='Cancelled').count()

        revenue_query = db.session.query(db.func.sum(Order.total_price)).filter_by(status='Completed').scalar()
        total_revenue = float(revenue_query) if revenue_query else 0.0

        total_bookings = TableBooking.query.count()
        pending_bookings = TableBooking.query.filter_by(status='Pending').count()
        approved_bookings = TableBooking.query.filter_by(status='Approved').count()

        return jsonify({
            'success': True,
            'stats': {
                'total_orders': total_orders,
                'pending_orders': pending_orders,
                'completed_orders': completed_orders,
                'cancelled_orders': cancelled_orders,
                'total_revenue': total_revenue,
                'total_bookings': total_bookings,
                'pending_bookings': pending_bookings,
                'approved_bookings': approved_bookings
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# -------------------------------------------------------------
# Gohar Assistant Chatbot Endpoint (Backend Proxy to Grok API)
# -------------------------------------------------------------

@app.route('/api/chat', methods=['POST'])
def chat_ai():
    """
    Gohar Assistant Chatbot backend proxy route.
    Uses GROK_API_KEY if configured, with intelligent contextual fallback.
    Does NOT mention 'Grok' in user-facing texts.
    """
    try:
        data = request.get_json() or {}
        user_message = data.get('message', '').strip()
        chat_history = data.get('history', [])

        if not user_message:
            return jsonify({'success': False, 'response': 'Please enter a question or request.'})

        # Call Groq AI API (model: openai/gpt-oss-120b)
        if groq_client:
            try:
                system_prompt = (
                    "You are the friendly customer concierge for 'Gohar Restaurant' located at "
                    "Iqbal Market Road, Sector #11, Near Khuda Buksh Bakers, Orangi Town, Karachi (Est. 1993). "
                    "Your identity is 'Gohar Restaurant Customer Support'. Do not describe yourself as an AI or robot. "
                    "Speak warmly and politely like a real hospitable Karachi restaurant team member. "
                    f"Restaurant details:\n"
                    f"- Contact & WhatsApp: {RESTAURANT_INFO['phone']}\n"
                    f"- Timings: {RESTAURANT_INFO['timings']}\n"
                    f"- Delivery: {RESTAURANT_INFO['delivery']}\n"
                    f"- 19 Popular Items: {', '.join(RESTAURANT_INFO['popular_items'])}\n"
                    f"- Menu Categories: {', '.join(RESTAURANT_INFO['categories'])}\n"
                    "Provide warm Pakistani hospitality. Inform customers they can reserve a table or order online right now."
                )

                messages = [{"role": "system", "content": system_prompt}]
                for msg in chat_history[-6:]:
                    messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
                messages.append({"role": "user", "content": user_message})

                completion = groq_client.chat.completions.create(
                    model=GROQ_MODEL,
                    messages=messages,
                    temperature=0.7,
                    max_completion_tokens=1024,
                    top_p=1
                )
                bot_text = completion.choices[0].message.content
                if bot_text:
                    return jsonify({'success': True, 'response': bot_text, 'powered_by': 'Gohar Assistant'})
            except Exception as e:
                print("[!] Groq API call error, falling back to local KB:", e)

        # Intelligent Built-in Knowledge Base Engine
        low = user_message.lower()

        if any(w in low for w in ['timing', 'time', 'open', 'close', 'hours', 'kab khulta']):
            reply = (
                "🕒 **Gohar Restaurant Timings**:\n\n"
                "• **Saturday to Thursday**: 1:00 PM – 1:00 AM (Midnight)\n"
                "• **Friday**: 2:00 PM – 1:00 AM (After Jummah Prayers)\n\n"
                "We are open 7 days a week to serve you sizzling BBQ, broast, karahi, and fresh desserts!"
            )
        elif any(w in low for w in ['location', 'address', 'where', 'kahan', 'orangi', 'sector']):
            reply = (
                "📍 **Our Location**:\n"
                "**Gohar Restaurant**, Iqbal Market Road, Sector #11, Near Khuda Buksh Bakers, Orangi Town, Karachi, Pakistan.\n\n"
                "🚗 Easily accessible from Banaras Chowk, Qatar Hospital road, and Metro Cinema. Contact us directly on WhatsApp at 03339229300!"
            )
        elif any(w in low for w in ['popular', 'special', 'best', 'recommend', 'top', 'khas', 'dish']):
            reply = (
                "⭐ **Top Recommendations at Gohar Restaurant**:\n\n"
                "1. **Crispy Broast Leg** (PKR 490) – Ultra-crunchy, juicy Karachi broast!\n"
                "2. **Dhaga Kabab & Paratha** (PKR 520) – Silky charcoal-smoked beef kababs.\n"
                "3. **Zinger Cheese Burger** (PKR 420) – Double-breaded crispy fillet with cheese.\n"
                "4. **Chicken Masala Rice** (PKR 450) – Rich fragrant Karachi spiced rice.\n"
                "5. **Gohar Special Falooda** (PKR 380) – Homemade rabri and kulfa heaven!\n\n"
                "Hover over any food card above to flip it and view details, then click 'Add to Cart'!"
            )
        elif any(w in low for w in ['contact', 'phone', 'whatsapp', 'number', 'call']):
            reply = (
                "📞 **Contact & WhatsApp Support**:\n\n"
                "• Phone / WhatsApp: **03339229300**\n"
                "• You can also click the bouncing green WhatsApp icon on the bottom-left to chat directly with our team!"
            )
        elif any(w in low for w in ['delivery', 'deliver', 'charges', 'free delivery', 'home delivery']):
            reply = (
                "🛵 **Home Delivery Information**:\n\n"
                "• We deliver across all sectors of Orangi Town, Banaras, Site, and nearby areas.\n"
                "• Delivery Fee: **PKR 100**\n"
                "• 🌟 **Free Delivery** on all orders above **PKR 1,500**!\n"
                "• Cash on Delivery (COD) is available on all orders."
            )
        elif any(w in low for w in ['booking', 'table', 'reserve', 'reservation']):
            reply = (
                "🪑 **Table Booking**:\n\n"
                "You can book a family table right now! Click the 'Reserve a Table' button in our hero banner or fill out the booking form on screen."
            )
        elif any(w in low for w in ['bbq', 'tikka', 'kabab', 'boti', 'malai']):
            reply = (
                "🔥 **Authentic Charcoal BBQ**:\n\n"
                "We grill Chicken Tikka (PKR 440), Beef Bihari Boti (PKR 490), "
                "Malai Boti (PKR 520), Dhaga Kabab (PKR 520), Chandan Kabab (PKR 480), and fresh hot Puri Parathas!"
            )
        elif any(w in low for w in ['broast', 'crispy', 'leg', 'chest']):
            reply = (
                "🍗 **Crispy Broast Specials**:\n\n"
                "Freshly prepared pressure-fried chicken served with crispy french fries, garlic dip & dinner roll:\n"
                "• Crispy Broast Leg: PKR 490\n"
                "• Crispy Broast Chest: PKR 530\n"
                "• Family Broast Bucket: PKR 1,850"
            )
        elif any(w in low for w in ['hello', 'hi', 'salam', 'assalam', 'hey']):
            reply = (
                "Assalamu Alaikum! Welcome to **Gohar Restaurant** (Est. 1993), Orangi Town, Karachi! 👨‍🍳✨\n\n"
                "I am **Gohar Assistant**. How can I help you today? You can ask about our 19 popular dishes, "
                "menu prices, delivery, or reserve a table!"
            )
        else:
            reply = (
                f"Thank you for contacting **Gohar Restaurant**! 🍽️\n\n"
                f"We are located on Iqbal Market Road, Orangi Town, Karachi (Est. 1993). "
                f"You can explore our 19 popular dishes, view the full menu, book a table, or call us directly at **03339229300**."
            )

        return jsonify({'success': True, 'response': reply, 'powered_by': 'Gohar Assistant'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# -------------------------------------------------------------
# Database Initializer & Sample Data
# -------------------------------------------------------------

def init_db():
    with app.app_context():
        db.create_all()
        if Order.query.count() == 0:
            sample_items = [
                {"id": 3, "name": "Crispy Broast Leg", "price": 490, "qty": 2, "total": 980},
                {"id": 6, "name": "Zinger Cheese Burger", "price": 420, "qty": 1, "total": 420},
                {"id": 1, "name": "Oreo Shake", "price": 320, "qty": 1, "total": 320}
            ]
            sample_order = Order(
                order_number="GOHAR-1993",
                customer_name="Muhammad Usman",
                phone="0333-1234567",
                address="House #42, Sector 11-E, Orangi Town, Karachi",
                notes="Extra garlic mayo sauce please",
                items_json=json.dumps(sample_items),
                subtotal=1720.0,
                delivery_fee=0.0,
                total_price=1720.0,
                payment_method="Cash on Delivery",
                status="Pending",
                created_at=datetime.datetime.utcnow() - datetime.timedelta(minutes=25)
            )
            db.session.add(sample_order)

            sample_booking = TableBooking(
                booking_code="TBL-501",
                name="Tariq Mahmood",
                phone="0321-9876543",
                date=datetime.date.today().strftime('%Y-%m-%d'),
                time="08:30 PM",
                guests=4,
                special_requests="Corner family table for birthday celebration",
                status="Approved",
                created_at=datetime.datetime.utcnow() - datetime.timedelta(hours=2)
            )
            db.session.add(sample_booking)
            db.session.commit()
            print("[*] Database initialized with sample order and booking.")

init_db()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[*] Gohar Restaurant server starting on http://127.0.0.1:{port}")
    print(f"[*] Admin panel available at http://127.0.0.1:{port}/admin")
    app.run(host='0.0.0.0', port=port, debug=False)
