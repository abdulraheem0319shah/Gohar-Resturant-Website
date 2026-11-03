# Gohar Restaurant (گوھر ریسٹورینٹ) - Karachi
> **Est. 1993** | Iqbal Market Road, Sector #11, Near Khuda Buksh Bakers, Orangi Town, Karachi, Pakistan.  
> **Contact / WhatsApp:** 03339229300  
> **Timings:** Sat–Thu: 1:00 PM – 1:00 AM | Fri: 2:00 PM – 1:00 AM

---

## 🌟 What's New & Upgraded:
1. **Official Luxury Logo Added:** Integrated the high-resolution Gold Chef Cloche & Ornate Filigree emblem (`logo.png`).
2. **Subtle Background Logo Watermark:** The site background features a low-opacity, fixed watermark of the Gohar Restaurant Logo in the center.
3. **Dark Slate Culinary Palette:** Inspired by premium dark slate restaurant aesthetics (`#121212`, `#18181A`, `#1E1E1E`), Gold/Amber accents (`#FFC107`, `#FFA000`), Crimson Red (`#E53935`), and crisp white typography.
4. **Complete Categorized Menu:** The menu page shows the supplied dishes in all 16 categories, with category food photography, exact listed prices, portion selectors where provided, and price ranges/unpriced dishes clearly marked rather than given invented prices.
5. **Home Hero Video & Carousel:** The home hero uses the existing muted, looping `video1.mp4` background, followed by the original 13-image carousel. Images display for four seconds, fade out between slides, loop from image 13 to image 1, and support arrows, dots, and pause-on-hover.
6. **Welcome & Order Setup:** Every page load begins with a branded video-and-logo loading screen. First-time visitors then choose a Karachi area and Pickup or Delivery; saved preferences let returning visitors continue automatically and are reflected in cart and checkout totals.
7. **Optional Customer Accounts:** Customers can create an account or sign in, but ordering does not require an account. Account emails and securely hashed passwords are stored in the SQLite database. Set `SECRET_KEY` in the environment to keep signed-in sessions valid across server restarts.
8. **Scroll Reveal Animation:** Page sections and menu cards animate into view as customers scroll, with reduced-motion preferences respected.
9. **3D Card Flip Animation:** Hovering over a menu card reveals a short description, price, and *"Add to Cart"* action. The menu page also features a restaurant banner and responsive category filters.
10. **Realistic 3D Buttons with Hover Jiggle:** All action buttons feature 3D depth and undergo a soft jiggle animation with an amber-gold glow on hover.
11. **Floating WhatsApp Button (Icon ONLY):** Continuously jumping green WhatsApp icon on the bottom-left linking to `https://wa.me/923339229300` (no visible phone text).
12. **"Gohar Assistant" AI Concierge:** Floating diamond AI icon on the bottom-right with continuous pulse-jump animation and Pakistani culinary concierge intelligence.
13. **Secure Admin Panel (`/admin`):**
   - Completely hidden from the public navigation and footer.
   - Accessing `/admin` directly requires `ADMIN_PASSWORD` to be set in the environment; admin login is unavailable when it is unset.
   - Generates itemized printable PDF/HTML receipts for **BOTH Food Delivery Orders and Table Reservations**.
   - Provides customer `Call` and `WhatsApp` actions for saved order and reservation phone numbers. Calls use the device's phone handler; WhatsApp opens a chat so staff can start a voice call there.
14. **Customer Reviews (`/reviews`):** Customers can submit a 1–5 star rating and a short comment, which are stored in the SQLite database and displayed on the reviews page.
15. **Dish Likes:** Customers can like each dish once per browser; like totals and visitor likes are stored in SQLite and shown on popular and categorized menu cards.
16. **Search Engine Basics:** Public pages include page-specific titles/descriptions, canonical and social metadata, and Restaurant structured data. `/robots.txt` and `/sitemap.xml` are served by Flask.

### Search engine setup

Before deploying, set `PUBLIC_BASE_URL` to the site's final HTTPS origin (for example, `https://www.example.com`). Submit `https://www.example.com/sitemap.xml` in Google Search Console, verify the restaurant's Google Business Profile, and keep its address, phone number, hours, and real customer reviews accurate and consistent. These steps help discovery but cannot guarantee a particular search ranking.

Set `ADMIN_PASSWORD`, `SECRET_KEY`, and `GROQ_API_KEY` through environment variables as needed. Do not commit `.env` files or the local SQLite database.

---

## 🚀 Live Access:
- **Main Website:** [http://127.0.0.1:5000](http://127.0.0.1:5000)
- **Admin Dashboard:** [http://127.0.0.1:5000/admin](http://127.0.0.1:5000/admin) *(configure `ADMIN_PASSWORD` in the environment)*
