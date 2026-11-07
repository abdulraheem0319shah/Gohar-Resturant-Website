/**
 * Gohar Restaurant - Client-side Logic & Interactions
 * Est. 1993 | Orangi Town, Karachi
 */

// ==============================================================
// 1. DATASETS: 19 POPULAR ITEMS & CATEGORIZED FULL MENU
// ==============================================================

const POPULAR_ITEMS = [
  {
    id: 1,
    name: "Oreo Shake",
    category: "SHAKES & DESSERTS",
    price: 320,
    desc: "Rich thick vanilla shake blended with premium crunchy Oreo cookies & chocolate drizzle.",
    praise: "Ultra-thick chilled delight with crushed Oreo crunch, rich dairy cream, and Hershey's chocolate swirls.",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    rating: "4.9 (420+)"
  },
  {
    id: 2,
    name: "Chicken Masala Rice",
    category: "CHINESE & RICE",
    price: 450,
    desc: "Fragrant spiced basmati rice tossed with marinated shredded chicken & Karachi secret herbs.",
    praise: "Aromatic long-grain basmati infused with caramelized onions, saffron aroma, and tender spicy chicken shreds.",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    rating: "4.8 (380+)"
  },
  {
    id: 3,
    name: "Crispy Broast Leg",
    category: "BROAST",
    price: 490,
    desc: "Golden fried crispy chicken leg piece served with signature garlic mayo dip & crispy fries.",
    praise: "Crispy, crackling golden skin on the outside, steamy juicy chicken inside, paired with our famous homemade garlic mayo.",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    rating: "5.0 (650+)"
  },
  {
    id: 4,
    name: "Gohar Special Falooda",
    category: "SHAKES & DESSERTS",
    price: 380,
    desc: "Traditional royal dessert with homemade rabri, kulfa ice cream, sweet basil seeds & rose syrup.",
    praise: "Karachi's favorite dessert masterpiece loaded with thick khoya rabri, pistachio kulfa, jelly, and sweet basil pearls.",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    rating: "4.9 (510+)"
  },
  {
    id: 5,
    name: "Pista Ice Cream (2 Scoops)",
    category: "SHAKES & DESSERTS",
    price: 250,
    desc: "Authentic creamy pistachio ice cream infused with cardamom and real roasted pistachios.",
    praise: "Velvety hand-churned frozen cream studded with fragrant roasted Iranian pistachios and pure green cardamom.",
    img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    rating: "4.7 (290+)"
  },
  {
    id: 6,
    name: "Zinger Cheese Burger",
    category: "BURGERS & SANDWICHES",
    price: 420,
    desc: "Ultra-crispy fried chicken thigh filet topped with melted cheese, iceberg lettuce & spicy sauce.",
    praise: "Huge marinated crispy fried fillet crowned with melted yellow cheddar, fresh crunchy lettuce, and zesty secret sauce.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    rating: "4.9 (590+)"
  },
  {
    id: 7,
    name: "Chicken Chow Mein",
    category: "CHINESE & RICE",
    price: 550,
    desc: "Wok-tossed egg noodles with tender chicken strips, crisp cabbage, capsicum & savoury sauces.",
    praise: "Sizzling wok tossed noodles loaded with chicken breast slivers, spring onions, bell peppers, and savory dark soy essence.",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
    rating: "4.8 (340+)"
  },
  {
    id: 8,
    name: "Mirchi Vada with Tea & Raita",
    category: "PLATTERS",
    price: 220,
    desc: "Crispy batter-fried stuffed chili fritters served with special mint raita and hot doodh patti tea.",
    praise: "Spicy whole green peppers stuffed with seasoned potato filling, fried to golden crispness, served with Karak Chai.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    rating: "4.8 (210+)"
  },
  {
    id: 9,
    name: "French Fries",
    category: "BURGERS & SANDWICHES",
    price: 220,
    desc: "Golden salted potato fries served with tangy ketchup and Gohar's special chatpata masala.",
    praise: "Crisp potato fingers fried fresh upon order and dusted with our addictive sweet-tangy chatpata masala seasoning.",
    img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
    rating: "4.7 (400+)"
  },
  {
    id: 10,
    name: "Broasted Chicken",
    category: "BROAST",
    price: 520,
    desc: "Pressure-fried seasoned quarter chicken with crunchy crust, soft juicy inside, plus bun and sauce.",
    praise: "Marinated overnight in 12 secret spices and sealed under high pressure for supreme tenderness and deafening crunch.",
    img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80",
    rating: "4.9 (480+)"
  },
  {
    id: 11,
    name: "Sandwich & Salad",
    category: "BURGERS & SANDWICHES",
    price: 360,
    desc: "Club layered toasted chicken sandwich with egg, fresh veggies and crisp Russian salad.",
    praise: "Triple-decker toasted white bread filled with pulled chicken, fried egg, cheddar slice, and chilled apple-pineapple Russian salad.",
    img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    rating: "4.6 (190+)"
  },
  {
    id: 12,
    name: "Chocolate Milkshake",
    category: "SHAKES & DESSERTS",
    price: 300,
    desc: "Velvety Belgian chocolate syrup shaken with whole dairy milk and chocolate ice cream scoop.",
    praise: "Decadent dark cocoa elixir blended with whole Buffalo milk and rich chocolate fudge scoop for pure bliss.",
    img: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80",
    rating: "4.8 (320+)"
  },
  {
    id: 13,
    name: "Zinger Burger & Fries",
    category: "BURGERS & SANDWICHES",
    price: 490,
    desc: "Big combo with giant crispy zinger burger, basket of seasoned fries and chilled beverage dip.",
    praise: "The hearty Karachi hunger buster: colossal zinger burger accompanied by a mountain of hot french fries and dip.",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    rating: "5.0 (720+)"
  },
  {
    id: 14,
    name: "Fried Kabab",
    category: "BAR B Q",
    price: 420,
    desc: "Spiced minced beef patty pan-fried in pure desi ghee, served with onion rings & lemon wedge.",
    praise: "Hand-ground beef patty seasoned with crushed pomegranate seeds and pan-fried in sizzling desi ghee.",
    img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    rating: "4.8 (260+)"
  },
  {
    id: 15,
    name: "Chicken Do Pyaza",
    category: "KARAHI & HANDI",
    price: 780,
    desc: "Rich Mughlai chicken curry prepared with caramelized onions, green chilies and roasted coriander.",
    praise: "Succulent bone-in chicken simmered in two distinct textures of slow-browned onions and aromatic whole spices.",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    rating: "4.9 (310+)"
  },
  {
    id: 16,
    name: "Special Lassi",
    category: "SHAKES & DESSERTS",
    price: 200,
    desc: "Creamy churned yogurt drink topped with thick malai layer. Available sweet or salted.",
    praise: "Traditional wooden-whisked country yogurt cooler blanketed under a thick, decadent crown of fresh malai.",
    img: "https://images.unsplash.com/photo-1571006687086-455a5bf90b41?auto=format&fit=crop&w=600&q=80",
    rating: "4.9 (430+)"
  },
  {
    id: 17,
    name: "Magaz Fried",
    category: "KARAHI & HANDI",
    price: 750,
    desc: "Tender brain masala sautéed with tomatoes, ginger juliennes, butter and aromatic spices.",
    praise: "Delicate beef brain sautéed in butter with tangy plum tomatoes, pungent green chilies, and slivers of fresh ginger.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    rating: "4.8 (240+)"
  },
  {
    id: 18,
    name: "Tikka & Paratha",
    category: "BAR B Q",
    price: 460,
    desc: "Spicy smoky coal-grilled chicken tikka piece served with flaky golden puri paratha.",
    praise: "Karachi's defining street culinary icon: flaming red coal-roasted chicken paired with blistering hot, flaky paratha.",
    img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    rating: "5.0 (850+)"
  },
  {
    id: 19,
    name: "Dhaga Kabab",
    category: "BAR B Q",
    price: 520,
    desc: "Famous thread-tied silky beef kababs infused with raw papaya, brown onion and charcoal smoke.",
    praise: "Velvety ribbons of marinated beef bound with sacred cotton thread and kissed by live coal fires until meltingly soft.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    rating: "5.0 (910+)"
  }
];

const LEGACY_CATEGORIZED_MENU = [
  // BAR B Q
  { id: 101, name: "Chicken Tikka (Chest/Leg)", category: "BAR B Q", price: 440, desc: "Charcoal grilled quarter chicken with tangy lemon.", praise: "Smoky spicy quarter chicken basted with butter over red glowing coal grills.", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80" },
  { id: 102, name: "Beef Bihari Boti", category: "BAR B Q", price: 490, desc: "Tender melt-in-mouth beef strips marinated in mustard oil & papaya.", praise: "Thin ribbons of beef tenderloin marinated in Bihari mustard spices and smoked slowly.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80" },
  { id: 103, name: "Chicken Malai Boti", category: "BAR B Q", price: 520, desc: "Boneless chicken cubes coated in fresh cream & white pepper.", praise: "Silky boneless morsels coated in pure milk cream and green chili paste.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: 104, name: "Seekh Kabab (Beef)", category: "BAR B Q", price: 420, desc: "Skewered beef mince charbroiled to juicy tenderness.", praise: "Freshly skewered spicy beef mince charcoal-grilled to juicy perfection.", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80" },
  { id: 105, name: "Dhaga Kabab (Signature)", category: "BAR B Q", price: 520, desc: "Famous silky thread kababs with coal smoke aroma.", praise: "Gohar's landmark recipe since 1993: melt-on-tongue thread kababs.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: 106, name: "Chandan Kabab", category: "BAR B Q", price: 480, desc: "Chicken & beef blend flavored with coriander seeds.", praise: "Fragrant dual-meat kabab infused with crushed roasted coriander and herbs.", img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80" },
  { id: 107, name: "Crispy Puri Paratha", category: "BAR B Q", price: 90, desc: "Golden flaky paratha - the ultimate BBQ companion.", praise: "Freshly rolled dough deep-fried in hot oil into a golden, puffy, crispy disk.", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80" },

  // BURGERS & SANDWICHES
  { id: 201, name: "Zinger Burger", category: "BURGERS & SANDWICHES", price: 390, desc: "Crispy fried chicken breast fillet with lettuce & mayo.", praise: "Giant crunchy chicken fillet coated in spicy breading with creamy mayonnaise.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { id: 202, name: "Zinger Cheese Burger", category: "BURGERS & SANDWICHES", price: 420, desc: "Crispy zinger with cheddar cheese slice.", praise: "Melted cheddar draped over an extra-crispy hot zinger fillet in soft toasted bun.", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" },
  { id: 203, name: "Jumbo Double Patty Burger", category: "BURGERS & SANDWICHES", price: 590, desc: "Double chicken patties with double cheese.", praise: "Stack of two thick crispy patties and double cheese for unstoppable appetites.", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80" },
  { id: 204, name: "Grilled Chicken Burger", category: "BURGERS & SANDWICHES", price: 450, desc: "Flame-grilled chicken breast steak with BBQ glaze.", praise: "Healthy tender chicken steak seared over direct flame with smoky seasoning.", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80" },
  { id: 205, name: "Classic Beef Burger", category: "BURGERS & SANDWICHES", price: 440, desc: "Juicy beef patty grilled with caramelized onions.", praise: "Savory beef patty grilled with caramelized onions and sliced pickles.", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" },
  { id: 206, name: "Gohar Club Sandwich", category: "BURGERS & SANDWICHES", price: 420, desc: "Three layered toasted sandwich with chicken & egg.", praise: "Triple layers of toasted bread packed with chicken spread, fried egg, and fries.", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80" },

  // CHINESE & RICE
  { id: 301, name: "Chicken Chow Mein", category: "CHINESE & RICE", price: 550, desc: "Wok fried Chinese noodles with chicken & dark soy.", praise: "Stir-fried noodles loaded with chicken, crunchy cabbage, and dark oyster soy.", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
  { id: 302, name: "Kung Pao Chicken", category: "CHINESE & RICE", price: 690, desc: "Spicy stir-fry with roasted peanuts & chili.", praise: "Spicy-sweet glaze with tender chicken cubes and crunchy roasted peanuts.", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80" },
  { id: 303, name: "Szechuan Chicken", category: "CHINESE & RICE", price: 680, desc: "Fiery sliced chicken tossed with Sichuan peppers.", praise: "Hot and zesty red pepper sauce tossed with wok-charred chicken strips.", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" },
  { id: 304, name: "Chicken Manchurian with Rice", category: "CHINESE & RICE", price: 640, desc: "Classic red spicy chicken sauce with egg fried rice.", praise: "Tangy tomato-garlic chicken gravy paired with aromatic egg fried rice.", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
  { id: 305, name: "Singaporean Rice", category: "CHINESE & RICE", price: 620, desc: "Layered rice topped with noodles, spicy chicken & mayo.", praise: "The ultimate Karachi fusion: spiced rice, noodles, chicken chunks, and garlic mayo.", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: 306, name: "Chicken Masala Rice", category: "CHINESE & RICE", price: 450, desc: "Karachi style desi Chinese spiced basmati rice.", praise: "Richly spiced rice dish flavored with roasted cumin and tender chicken.", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },

  // BROAST
  { id: 401, name: "Crispy Broast Leg", category: "BROAST", price: 490, desc: "Ultra crunchy leg broast with fries & garlic dip.", praise: "Tender leg cut fried under pressure to golden perfection with signature dip.", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80" },
  { id: 402, name: "Crispy Broast Chest", category: "BROAST", price: 530, desc: "Juicy breast piece coated in secret crunchy batter.", praise: "Substantial white meat chest piece boasting maximum crunch and tenderness.", img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80" },
  { id: 403, name: "Family Broast Bucket (4 Pcs)", category: "BROAST", price: 1850, desc: "4 large broast pieces, family fries, 4 buns & dips.", praise: "Grand banquet bucket with 4 pieces of broast, family fries, and 4 dinner buns.", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80" },

  // KARAHI & HANDI
  { id: 501, name: "Chicken Karahi (Half / 500g)", category: "KARAHI & HANDI", price: 780, desc: "Wok-cooked fresh chicken with tomatoes & ginger.", praise: "Prepared in traditional iron wok with fresh red tomatoes, green chilies, and black pepper.", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" },
  { id: 502, name: "Chicken Karahi (Full / 1kg)", category: "KARAHI & HANDI", price: 1450, desc: "Full pot traditional Karachi karahi with rich gravy.", praise: "Full 1kg feast simmered in rich gravy with julienned ginger and fresh coriander.", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" },
  { id: 503, name: "Beef Karahi (Half)", category: "KARAHI & HANDI", price: 890, desc: "Slow braised beef shank cooked in tomato-garlic base.", praise: "Tender chunks of beef shank braised slowly until falling apart.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: 504, name: "Chicken Achari Handi", category: "KARAHI & HANDI", price: 820, desc: "Tangy pickled spiced boneless chicken in clay handi.", praise: "Boneless cubes steeped in pickling spices and slow-cooked in earthen pottery.", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80" },
  { id: 505, name: "Chicken Makhni Handi", category: "KARAHI & HANDI", price: 850, desc: "Creamy boneless cubes in rich butter & cashew sauce.", praise: "Silky velvety tomato gravy enriched with fresh churned butter and cashew paste.", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" },
  { id: 506, name: "Chicken White Handi", category: "KARAHI & HANDI", price: 860, desc: "Mild white gravy prepared with fresh cream & almonds.", praise: "Mild fragrant white curry prepared with thick cream, yogurt, and crushed almonds.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },

  // PLATTERS
  { id: 601, name: "Gohar Special Platter (3-4 Person)", category: "PLATTERS", price: 2450, desc: "Feast with Tikka, Seekh Kabab, Broast, Rice & Parathas.", praise: "Royal culinary spread loaded with Chicken Tikka, Broast, Seekh Kabab, Rice & Parathas.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80" },
  { id: 602, name: "BBQ Mix Platter", category: "PLATTERS", price: 1890, desc: "Malai Boti, Beef Seekh Kababs, Dhaga Kabab & Parathas.", praise: "The ultimate coal-grilled ensemble with tender boti, spicy kababs, and flaky parathas.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: 603, name: "Broast & Burger Platter", category: "PLATTERS", price: 1550, desc: "2 Zinger Burgers, 2 Crispy Broast pieces & mega fries.", praise: "Fast food feast combining two crispy zinger burgers with two golden broast legs.", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" },

  // SHAKES & DESSERTS
  { id: 701, name: "Oreo Shake", category: "SHAKES & DESSERTS", price: 320, desc: "Thick vanilla shake with crunchy Oreo cookies.", praise: "Thick creamy shake blended with dark cocoa biscuits and whipped cream.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80" },
  { id: 702, name: "Chocolate Milkshake", category: "SHAKES & DESSERTS", price: 300, desc: "Belgian chocolate blended with ice cream scoop.", praise: "Velvety chocolate goodness crafted with rich cocoa and whole milk.", img: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80" },
  { id: 703, name: "Gohar Special Falooda", category: "SHAKES & DESSERTS", price: 380, desc: "Royal glass with kulfa, rabri, noodles & rose syrup.", praise: "Handcrafted dessert layered with sweet rabri, basil seeds, and pistachio kulfa.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
  { id: 704, name: "Pista Ice Cream (2 Scoops)", category: "SHAKES & DESSERTS", price: 250, desc: "Handcrafted rich pistachio scoop with dry fruits.", praise: "Creamy frozen dessert enriched with real roasted pistachio nuts.", img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80" },
  { id: 705, name: "Special Lassi (Sweet/Salted)", category: "SHAKES & DESSERTS", price: 200, desc: "Traditional churning lassi topped with fresh thick cream.", praise: "Country style churned yogurt drink crowned with thick sweet malai.", img: "https://images.unsplash.com/photo-1571006687086-455a5bf90b41?auto=format&fit=crop&w=600&q=80" }
];

const MENU_CATEGORIES = [
  { name: "STARTER", items: [["Chk Dynamite", 500]] },
  { name: "KARAHI", items: [
    ["Beef Karahi", [["Half", 1600], ["Full", 3000]]],
    ["Chk Karahi", [["Half", 1100], ["Full", 2000]]],
    ["Chk White Karahi", [["Half", 1200], ["Full", 2200]]],
    ["Chk Green Karahi", [["Half", 1200], ["Full", 2200]]],
    ["Chk Boneless Karahi", [["Half", 1200], ["Full", 2400]]],
    ["Chk Balochi Karahi (Dry)", [["Half", 1300], ["Full", 2400]]]
  ] },
  { name: "HANDI", items: [
    ["Chk Achari Handi", [["Half", 1500], ["Full", 2800]]],
    ["Chk Makhni Handi", [["Half", 1600], ["Full", 3000]]],
    ["Chk White Handi", [["Half", 1500], ["Full", 2800]]],
    ["Chk Handi", [["Half", 1400], ["Full", 2600]]],
    ["Chk Paneer Handi", [["Half", 1700], ["Full", 3200]]]
  ] },
  { name: "PAKISTANI CURRY", items: [["Daal Makhni", 500], ["Chk Fried Qeema", 900]] },
  { name: "BAR B Q", description: "Charcoal-grilled favorites, freshly prepared to order.", items: [
    ["Chk Tikka Chest", 600], ["Chk Tikka Malai", 650], ["Chk Tikka Malai Green", 650],
    ["Chk Tikka Leg", 450], ["Chk Tikka Bihari", 600], ["Beef Bihari Boti", 600],
    ["Chk Bihari Boti", 500], ["Chk Malai Boti", 550], ["Chandan Kabab", 550],
    ["Beef Seekh Kabab", 500], ["Beef Gola Kabab", 500], ["Beef Dhaga Kabab", 500],
    ["Beef Dhaga Kabab Fry", 650], ["Chk Reshmi Kabab", 500], ["Turkish Kabab", 600]
  ] },
  { name: "BURGER", description: "Served with fries.", items: [
    ["Zinger Burger", 550], ["Zinger Cheese Burger", 600], ["Zinger Jumbo Burger", 900],
    ["Chk Burger", 450], ["Chk Cheese Burger", 500], ["Chk Jumbo Burger", 800],
    ["Chk Grilled Burger", 600], ["Crunchy Chk Burger", 500], ["Chicken Mexican Burger", 550],
    ["Chicken Texas Burger", 600], ["Chicken Classic Burger", 550],
    ["Chicken White Mushroom Burger", 600], ["Beef Burger", 450], ["Beef Cheese Burger", 500],
    ["Beef Jumbo Burger", 800], ["Beef Mexican Burger", 550], ["Beef Texas Burger", 550],
    ["Beef Classic Burger", 550], ["Beef White Mushroom Burger", 600], ["Two In One Burger", 800]
  ] },
  { name: "BROAST", description: "Served with fries.", items: [
    ["QTR Broast Chest", 600], ["QTR Broast Leg", 500], ["Crispy Broast Chest", 700],
    ["Crispy Broast Leg", 600], ["Masala Broast", 700], ["Spicy Broast", 700],
    ["Chatpata Broast", 700]
  ] },
  { name: "CHINESE CUISINE", description: "Served with rice.", items: [
    ["Chk Kung Pao", 950], ["Chk Szechuan", 900], ["Chk Dragon", 1000],
    ["Chk Garlic", 900], ["Chk Manchurian", 950], ["Chk Chilli Dry", 1000],
    ["Chk Chilli Vegetable", 900], ["Chk Shashlik", 900], ["Chk Jalfrezi", 900]
  ] },
  { name: "RICE", items: [
    ["Chk Fried Rice", 600], ["Veg Fried Rice", 500], ["Chk Masala Rice", 650],
    ["Chk Singaporean Rice", 950], ["Chk Creamy Singaporean Rice", 1050]
  ] },
  { name: "SANDWICH", description: "Served with fries.", items: [
    ["BBQ Club Sandwich", 700], ["BBQ Cheese Sandwich", 700], ["Crispy Sandwich", 650],
    ["Crispy Cheese Sandwich", 700], ["Club Sandwich", 550], ["Club Cheese Sandwich", 600],
    ["Chk Sandwich", 500], ["Chk Cheese Sandwich", 550]
  ] },
  { name: "CHICKEN & BEEF ROLLS", items: [
    ["Chk Chutney Roll", 220], ["Chk Mayo Roll", 270], ["Chk Cheese Mayo Roll", 300],
    ["Chk Crispy Roll", 330], ["Chk Crispy Cheese Roll", 380], ["Chk Malai Boti Roll", 280],
    ["Chk Malai Boti Cheese Roll", 320], ["Beef Chutney Roll", 240], ["Beef Mayo Roll", 280],
    ["Beef Cheese Mayo Roll", 320], ["Beef Kabab Roll", 260]
  ] },
  { name: "NOODLES & PASTA", items: [
    ["Chk Chow Mein", 900], ["Vegetable Chow Mein", 800], ["Chk Spicy Chow Mein", 950],
    ["Fettuccine Alfredo", 1000], ["Penne Arabiata Pasta", 1100]
  ] },
  { name: "FRIES", items: [
    ["Plain Fries", 200], ["Mayo Fries", 250], ["Masala Fries", 250],
    ["Pizza Fries (Small)", 350], ["Pizza Fries (Large)", 600]
  ] },
  { name: "HOT TANDOOR", items: [
    ["Puri Paratha", 150], ["Puri Paratha Small", 100], ["Chapati", 25]
  ] },
  { name: "PLATTERS", items: [
    ["Classic 2 Person Platter", 2000], ["Classic 4 Person Platter", 3800],
    ["Gohar Special 4 Person Platter", null], ["BBQ 3 Person Platter", null]
  ] },
  { name: "DESSERTS, SHAKES & MOCKTAILS", items: [
    ["Special Falooda", 420],
    ["Ice Cream (Pista, Kulfa, Tutti Fruiti, Mango, Chocolate Chips, Strawberry Ripple, Pineapple, Blueberry, Vanilla Creamy)", [["1 Scoop", 110], ["2 Scoops", 220]]],
    ["Banana Date Shake", 300], ["Banana Shake", 250], ["Date Shake", 350],
    ["Oreo Shake", 350], ["Nutella Shake", 400], ["Cold Coffee", 400],
    ["Mango / Pineapple / Strawberry / Blueberry / Chocolate Ice Cream Shakes", "300–350"],
    ["Lemon Mint Glacier", 250], ["Fresh Lime", 180],
    ["Blue Breeze / Pina Colada / Blue Colada", "280–300"]
  ] }
];

let nextMenuItemId = 1000;
const MENU_DESCRIPTIONS = {
  STARTER: "A crispy, savory bite with a lively kick.",
  KARAHI: "A sizzling karahi cooked to order with a bold, aromatic masala.",
  HANDI: "A comforting handi with a rich, slow-simmered sauce.",
  "PAKISTANI CURRY": "A hearty Pakistani classic with deep, warming spice.",
  "BAR B Q": "Charcoal-grilled for smoky edges and a juicy, satisfying bite.",
  BURGER: "A hearty burger served with fries and a satisfying crunch.",
  BROAST: "A crisp-coated, juicy broast served with fries.",
  "CHINESE CUISINE": "A wok-finished Chinese favorite served with rice.",
  RICE: "A freshly prepared rice dish seasoned for a satisfying meal.",
  SANDWICH: "A generously filled sandwich served with fries.",
  "CHICKEN & BEEF ROLLS": "A warm, hand-rolled wrap filled with savory flavor.",
  "NOODLES & PASTA": "A comforting bowl of noodles or pasta, made to order.",
  FRIES: "Golden, crisp fries with a savory finish.",
  "HOT TANDOOR": "Fresh from the tandoor, warm and ready to pair with your meal.",
  PLATTERS: "A shareable feast of restaurant favorites.",
  "DESSERTS, SHAKES & MOCKTAILS": "A chilled, sweet or refreshing finish to your meal."
};
const MENU_CATEGORY_IMAGES = {
  STARTER: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85",
  KARAHI: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=85",
  HANDI: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85",
  "PAKISTANI CURRY": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=85",
  "BAR B Q": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85",
  BURGER: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  BROAST: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=85",
  "CHINESE CUISINE": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=700&q=85",
  RICE: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=85",
  SANDWICH: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=85",
  "CHICKEN & BEEF ROLLS": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=85",
  "NOODLES & PASTA": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=85",
  FRIES: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=700&q=85",
  "HOT TANDOOR": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=85",
  PLATTERS: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=85",
  "DESSERTS, SHAKES & MOCKTAILS": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=85"
};
const FULL_CATEGORIZED_MENU = MENU_CATEGORIES.flatMap(({ name: category, description, items }) =>
  items.map(([name, pricing]) => {
    const options = Array.isArray(pricing)
      ? pricing.map(([label, price]) => ({ label, price }))
      : null;
    const price = typeof pricing === "number" ? pricing : null;
    const hasPriceRange = typeof pricing === "string";
    const priceLabel = options
      ? options.map(option => `${option.label}: Rs. ${option.price}`).join(" / ")
      : price !== null ? `Rs. ${price}` : pricing ? `Rs. ${pricing}` : "Price not listed";
    const cookingNote = [MENU_DESCRIPTIONS[category], description].filter(Boolean).join(" ");
    return {
      id: nextMenuItemId++,
      name,
      category,
      price,
      options,
      flavors: name.startsWith("Ice Cream (")
        ? ["Pista", "Kulfa", "Tutti Fruiti", "Mango", "Chocolate Chips", "Strawberry Ripple", "Pineapple", "Blueberry", "Vanilla Creamy"]
        : null,
      hasPriceRange,
      priceLabel,
      desc: cookingNote,
      praise: `${name}: ${cookingNote}`,
      img: MENU_CATEGORY_IMAGES[category]
    };
  })
);

const ALL_MENU_ITEMS = [...POPULAR_ITEMS, ...FULL_CATEGORIZED_MENU];
window.GOHAR_MENU_ITEMS = FULL_CATEGORIZED_MENU;

// ==============================================================
// 2. STATE & CART MANAGEMENT
// ==============================================================

let cart = [];
let dishLikes = {};
let likedDishIds = new Set();
let dishLikesVisitorId;
let customerOrderPreferences = null;
let customerAccount = null;
let customerAuthMode = 'login';

function markInternalPageNavigation() {
  try {
    sessionStorage.setItem('gohar_skip_welcome_once', String(Date.now()));
  } catch {
    return;
  }
}

function consumeInternalPageNavigation() {
  try {
    const markedAt = Number(sessionStorage.getItem('gohar_skip_welcome_once'));
    sessionStorage.removeItem('gohar_skip_welcome_once');
    return Number.isFinite(markedAt) && Date.now() - markedAt < 10000;
  } catch {
    return false;
  }
}

function readCustomerOrderPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem('gohar_order_preferences') || 'null');
    const areaSelect = document.getElementById('customerArea');
    const isKnownArea = areaSelect && Array.from(areaSelect.options)
      .some((option) => option.value === saved?.area);
    const isValidCustomArea = saved?.customArea === true &&
      typeof saved.area === 'string' &&
      /^[A-Za-z0-9][A-Za-z0-9\s.,'()\-]{0,79}$/.test(saved.area);
    if (saved && (isKnownArea || isValidCustomArea) &&
        ['delivery', 'pickup'].includes(saved.orderType)) {
      return saved;
    }
  } catch (error) {
    console.error('Could not read saved order preferences:', error);
  }
  return null;
}

function applyCustomerOrderPreferences() {
  const button = document.getElementById('editOrderPreferences');
  const label = document.getElementById('orderPreferencesLabel');
  if (button && label && customerOrderPreferences) {
    const preferenceLabel = `${customerOrderPreferences.area} · ${customerOrderPreferences.orderType === 'pickup' ? 'Pickup' : 'Delivery'}`;
    label.textContent = preferenceLabel;
    button.setAttribute('aria-label', `Change order location and type: ${preferenceLabel}`);
    button.title = preferenceLabel;
    button.hidden = false;
  }
  updateCartUI();
}

function showOrderSetup() {
  const screen = document.getElementById('orderSetup');
  const areaSelect = document.getElementById('customerArea');
  const customAreaInput = document.getElementById('customCustomerArea');
  const selectedType = document.querySelector(`input[name="orderType"][value="${customerOrderPreferences?.orderType || ''}"]`);
  if (!screen || !areaSelect) return;

  document.documentElement.classList.add('needs-order-setup');
  const isCustomArea = customerOrderPreferences?.customArea === true;
  areaSelect.value = isCustomArea ? 'Other Karachi area' : customerOrderPreferences?.area || '';
  if (customAreaInput) {
    customAreaInput.hidden = !isCustomArea;
    customAreaInput.required = isCustomArea;
    customAreaInput.value = isCustomArea ? customerOrderPreferences.area : '';
  }
  document.querySelectorAll('input[name="orderType"]').forEach((input) => {
    input.checked = input === selectedType;
    input.closest('.order-type-option')?.classList.toggle('is-selected', input.checked);
  });
  screen.hidden = false;
  window.setTimeout(() => areaSelect.focus(), 50);
}

function startWelcomeFlow() {
  customerOrderPreferences = readCustomerOrderPreferences();
  if (customerOrderPreferences) applyCustomerOrderPreferences();

  const loader = document.getElementById('welcomeLoader');
  if (!loader) return;
  if (consumeInternalPageNavigation()) {
    document.documentElement.classList.remove('needs-order-setup');
    return;
  }

  loader.hidden = false;
  window.requestAnimationFrame(() => loader.classList.add('is-visible'));
  const video = loader.querySelector('video');
  if (video && !window.matchMedia('(max-width: 768px)').matches) {
    video.play().catch((error) => {
      console.warn('Welcome background video could not autoplay:', error);
    });
  }

  window.setTimeout(() => {
    loader.classList.add('is-leaving');
    window.setTimeout(() => {
      loader.hidden = true;
      loader.classList.remove('is-visible', 'is-leaving');
      if (customerOrderPreferences) {
        document.documentElement.classList.remove('needs-order-setup');
      } else {
        showOrderSetup();
      }
    }, 450);
  }, 5000);
}

function setCustomerAuthMode(mode) {
  customerAuthMode = mode;
  const isRegister = mode === 'register';
  document.querySelectorAll('.customer-auth-tab').forEach((tab) => {
    const isActive = tab.dataset.authMode === mode;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
  document.getElementById('customerAccountNameGroup').hidden = !isRegister;
  document.getElementById('customerAccountNameInput').required = isRegister;
  document.getElementById('customerAccountPasswordHint').hidden = !isRegister;
  document.getElementById('customerAccountPasswordInput').autocomplete =
    isRegister ? 'new-password' : 'current-password';
  document.getElementById('customerAccountSubmit').textContent =
    isRegister ? 'Create account' : 'Sign in';
  document.getElementById('customerAccountMessage').textContent = '';
}

function renderCustomerAccount(account) {
  customerAccount = account || null;
  const button = document.getElementById('customerAccountButton');
  const forms = document.getElementById('customerAccountForms');
  const signedIn = document.getElementById('customerAccountSignedIn');
  if (button) button.textContent = customerAccount ? 'My account' : 'Sign in';
  if (forms) forms.hidden = Boolean(customerAccount);
  if (signedIn) signedIn.hidden = !customerAccount;
  if (customerAccount) {
    document.getElementById('customerAccountName').textContent = customerAccount.name;
    document.getElementById('customerAccountEmail').textContent = customerAccount.email;
  }
}

async function loadCustomerAccount() {
  try {
    const response = await fetch('/api/customer/account');
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not check account status.');
    renderCustomerAccount(data.authenticated ? data.account : null);
  } catch (error) {
    console.error('Could not check customer account:', error);
  }
}

async function submitCustomerAccount(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = document.getElementById('customerAccountSubmit');
  const message = document.getElementById('customerAccountMessage');
  const formData = new FormData(form);
  const isRegister = customerAuthMode === 'register';
  const endpoint = isRegister ? '/api/customer/register' : '/api/customer/login';
  const payload = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  if (isRegister) payload.name = formData.get('name');

  message.textContent = '';
  message.classList.remove('is-error');
  submitButton.disabled = true;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Could not sign in. Please try again.');
    }
    renderCustomerAccount(data.account);
    form.reset();
  } catch (error) {
    message.textContent = error.message || 'Could not sign in. Please try again.';
    message.classList.add('is-error');
  } finally {
    submitButton.disabled = false;
  }
}

function openCustomerAccount() {
  setCustomerAuthMode('login');
  if (customerAccount) renderCustomerAccount(customerAccount);
  else {
    document.getElementById('customerAccountForms').hidden = false;
    document.getElementById('customerAccountSignedIn').hidden = true;
  }
  openModal('customerAccountModal');
}

async function logoutCustomerAccount() {
  const message = document.getElementById('customerAccountMessage');
  try {
    const response = await fetch('/api/customer/logout', { method: 'POST' });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Could not sign out.');
    }
    renderCustomerAccount(null);
    setCustomerAuthMode('login');
  } catch (error) {
    message.textContent = error.message || 'Could not sign out.';
    message.classList.add('is-error');
  }
}

function saveCustomerOrderPreferences(event) {
  event.preventDefault();
  const areaSelect = document.getElementById('customerArea');
  const customAreaInput = document.getElementById('customCustomerArea');
  const customArea = areaSelect.value === 'Other Karachi area';
  const area = customArea ? customAreaInput.value.trim() : areaSelect.value;
  const orderType = document.querySelector('input[name="orderType"]:checked')?.value;
  const message = document.getElementById('orderSetupMessage');
  message.textContent = '';
  if (!area || (customArea && !/^[A-Za-z0-9][A-Za-z0-9\s.,'()\-]{0,79}$/.test(area)) ||
      !['delivery', 'pickup'].includes(orderType)) {
    message.textContent = 'Please enter a valid Karachi area and choose an order type.';
    return;
  }

  customerOrderPreferences = { area, orderType, customArea };
  try {
    localStorage.setItem('gohar_order_preferences', JSON.stringify(customerOrderPreferences));
  } catch (error) {
    console.error('Could not save order preferences:', error);
    message.textContent = 'Your browser could not save this choice. Please enable site storage and try again.';
    return;
  }

  applyCustomerOrderPreferences();
  document.getElementById('orderSetup').hidden = true;
  document.documentElement.classList.remove('needs-order-setup');
  document.getElementById('editOrderPreferences')?.focus();
}

function setupScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)) {
    return;
  }

  const revealTargets = document.querySelectorAll(
    '.section-header, .menu-feature-banner, .info-banner, .card-flip-container'
  );
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-scroll-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealTargets.forEach((target, index) => {
    target.classList.add('scroll-reveal');
    target.style.setProperty('--scroll-reveal-delay', `${(index % 5) * 65}ms`);
    observer.observe(target);
  });
}

function setupPizzaSliceScroll() {
  const section = document.getElementById('pizzaScrollSection');
  const artwork = section?.querySelector('.pizza-scroll-art');
  if (!section || !artwork || document.body.dataset.page !== 'home' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let frame = null;
  const updateAnimation = () => {
    frame = null;
    const bounds = section.getBoundingClientRect();
    const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -bounds.top / scrollDistance));
    const smoothStep = (start, end, value) => {
      const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
      return t * t * (3 - 2 * t);
    };
    const fadeIn = 0.65 + 0.35 * smoothStep(0, 0.1, progress);
    const fadeOut = 1 - smoothStep(0.76, 1, progress);
    const scale = 0.45 + (1.05 - 0.45) * progress;
    const verticalTravel = window.innerHeight * -0.55 * progress;
    const rotation = -10 + 360 * progress;

    artwork.style.setProperty('--pizza-opacity', String(fadeIn * fadeOut));
    artwork.style.setProperty('--pizza-y', `${verticalTravel}px`);
    artwork.style.setProperty('--pizza-scale', String(scale));
    artwork.style.setProperty('--pizza-rotate', `${rotation}deg`);
  };
  const requestAnimation = () => {
    if (frame === null) frame = window.requestAnimationFrame(updateAnimation);
  };

  window.addEventListener('scroll', requestAnimation, { passive: true });
  window.addEventListener('resize', requestAnimation);
  updateAnimation();
}

function getDishLikesVisitorId() {
  if (dishLikesVisitorId) return dishLikesVisitorId;
  try {
    dishLikesVisitorId = localStorage.getItem('gohar_dish_likes_visitor');
  } catch (error) {
    dishLikesVisitorId = null;
  }
  if (!dishLikesVisitorId) {
    dishLikesVisitorId = typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        const value = Math.floor(Math.random() * 16);
        return (char === 'x' ? value : (value & 0x3) | 0x8).toString(16);
      });
    try {
      localStorage.setItem('gohar_dish_likes_visitor', dishLikesVisitorId);
    } catch (error) {
      // Keep the generated ID for this page session if browser storage is unavailable.
    }
  }
  return dishLikesVisitorId;
}

function dishLikeButtonMarkup(dishId) {
  const liked = likedDishIds.has(dishId);
  return `
    <button class="dish-like-button${liked ? ' is-liked' : ''}" type="button"
      data-dish-like="${dishId}" aria-pressed="${liked}"
      aria-label="${liked ? 'Liked' : 'Like'} this dish; ${dishLikes[dishId] || 0} likes"
      onclick="likeDish(${dishId}, event)">
      <span class="dish-like-heart" aria-hidden="true">${liked ? '♥' : '♡'}</span>
      <span class="dish-like-count">${dishLikes[dishId] || 0}</span>
    </button>
  `;
}

function burstLikeHearts(button) {
  const burst = document.createElement('span');
  burst.className = 'like-heart-burst';
  burst.setAttribute('aria-hidden', 'true');

  for (let index = 0; index < 12; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'like-heart-particle';
    heart.textContent = '♥';
    heart.style.setProperty('--heart-x', `${Math.round(Math.random() * 180 - 90)}px`);
    heart.style.setProperty('--heart-delay', `${Math.random() * 180}ms`);
    heart.style.setProperty('--heart-size', `${Math.round(Math.random() * 12 + 14)}px`);
    burst.appendChild(heart);
  }

  button.appendChild(burst);
  window.setTimeout(() => burst.remove(), 1500);
}

function setupDishLikeButtonInteractions() {
  document.querySelectorAll('[data-dish-like]').forEach((button) => {
    const card = button.closest('.card-flip-container');
    if (!card) return;

    button.addEventListener('pointerenter', () => card.classList.add('like-interaction'));
    button.addEventListener('pointerleave', () => card.classList.remove('like-interaction'));
    button.addEventListener('focus', () => card.classList.add('like-interaction'));
    button.addEventListener('blur', () => card.classList.remove('like-interaction'));
  });
}

function updateDishLikeButtons() {
  document.querySelectorAll('[data-dish-like]').forEach((button) => {
    const dishId = Number(button.dataset.dishLike);
    const liked = likedDishIds.has(dishId);
    const heart = button.querySelector('.dish-like-heart');
    const count = button.querySelector('.dish-like-count');
    button.classList.toggle('is-liked', liked);
    button.setAttribute('aria-pressed', String(liked));
    button.setAttribute('aria-label', `${liked ? 'Liked' : 'Like'} this dish; ${dishLikes[dishId] || 0} likes`);
    if (heart) heart.textContent = liked ? '♥' : '♡';
    if (count) count.textContent = dishLikes[dishId] || 0;
  });
}

async function loadDishLikes() {
  const visitorId = getDishLikesVisitorId();
  const response = await fetch(`/api/dishes/likes?visitor_id=${encodeURIComponent(visitorId)}`);
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Could not load dish likes.');
  }
  dishLikes = Object.fromEntries(
    Object.entries(data.likes).map(([dishId, count]) => [Number(dishId), count])
  );
  likedDishIds = new Set(data.liked_dish_ids);
  updateDishLikeButtons();
}

async function likeDish(dishId, event) {
  event.stopPropagation();
  const button = event.currentTarget;
  if (button.disabled || likedDishIds.has(dishId)) return;
  button.disabled = true;
  try {
    const response = await fetch('/api/dishes/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dish_id: dishId, visitor_id: getDishLikesVisitorId() })
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Could not save your like.');
    }
    dishLikes[dishId] = data.like_count;
    likedDishIds.add(dishId);
    updateDishLikeButtons();
    burstLikeHearts(button);
  } catch (error) {
    showToast(error.message || 'Could not save your like. Please try again.');
  } finally {
    button.disabled = likedDishIds.has(dishId);
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('gohar_cart');
    cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    cart = [];
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('gohar_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(itemId, e, optionIndex, flavorIndex) {
  if (e) {
    e.stopPropagation();
  }
  const item = ALL_MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const selectedOption = item.options && item.options[Number(optionIndex) || 0];
  const price = selectedOption ? selectedOption.price : item.price;
  if (price === null || price === undefined) {
    showToast(item.hasPriceRange
      ? `Please confirm the exact price for "${item.name}" with the restaurant before ordering.`
      : `A price is not listed for "${item.name}".`);
    return;
  }
  const variant = selectedOption ? selectedOption.label : "";
  const selectedFlavor = item.flavors && item.flavors[Number(flavorIndex) || 0];
  const cartVariant = [selectedFlavor, variant].filter(Boolean).join(" — ");
  const existing = cart.find(i => i.id === itemId && (i.variant || "") === cartVariant);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price,
      variant: cartVariant,
      qty: 1
    });
  }

  saveCart();
  showToast(`Added "${item.name}" to cart.`);
}

function changeQty(itemId, delta, variant = "") {
  const index = cart.findIndex(i => i.id === itemId && (i.variant || "") === variant);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
    showToast("Item removed from cart");
  }
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function updateCartUI() {
  const countBadges = document.querySelectorAll('.cart-badge-count');
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  countBadges.forEach(b => b.textContent = totalCount);

  const cartList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDeliveryEl = document.getElementById('cartDelivery');
  const cartTotalEl = document.getElementById('cartTotal');
  const freeDeliveryNotice = document.getElementById('freeDeliveryNotice');
  const isPickup = customerOrderPreferences?.orderType === 'pickup';
  const cartDeliveryLabel = document.getElementById('cartDeliveryLabel');
  if (cartDeliveryLabel) {
    cartDeliveryLabel.textContent = isPickup
      ? 'Order type'
      : `Delivery Fee (${customerOrderPreferences?.area || 'Karachi'})`;
  }

  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-state" style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <svg class="empty-cart-icon ui-icon" aria-hidden="true"><use href="#icon-utensils"></use></svg>
        <h4>Your Cart is Empty</h4>
        <p style="font-size: 0.85rem; margin-top: 6px;">Hover over dishes to flip cards and add delicious Karachi items!</p>
      </div>
    `;
    if (cartSubtotalEl) cartSubtotalEl.textContent = 'PKR 0';
    if (cartDeliveryEl) cartDeliveryEl.textContent = isPickup ? 'Pickup' : 'PKR 0';
    if (cartTotalEl) cartTotalEl.textContent = 'PKR 0';
    if (freeDeliveryNotice) freeDeliveryNotice.style.display = 'none';
    return;
  }

  let subtotal = 0;
  cartList.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <h4 style="font-size: 0.92rem; margin-bottom: 2px;">${item.name}${item.variant ? ` — ${item.variant}` : ""}</h4>
          <div style="font-size: 0.82rem; color: var(--gold-light);">Rs. ${item.price} × ${item.qty} = <strong>Rs. ${itemTotal}</strong></div>
        </div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1, '${item.variant || ""}')">-</button>
          <span style="font-weight: 700; min-width: 18px; text-align: center;">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1, '${item.variant || ""}')">+</button>
        </div>
      </div>
    `;
  }).join('');

  const deliveryFee = isPickup || subtotal >= 1500 ? 0 : 100;
  const grandTotal = subtotal + deliveryFee;

  if (cartSubtotalEl) cartSubtotalEl.textContent = `PKR ${subtotal}`;
  if (cartDeliveryEl) {
    cartDeliveryEl.textContent = isPickup ? 'No delivery fee' : deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`;
  }
  if (cartTotalEl) cartTotalEl.textContent = `PKR ${grandTotal}`;

  if (freeDeliveryNotice) {
    if (isPickup) {
      freeDeliveryNotice.style.display = 'none';
    } else if (subtotal >= 1500) {
      freeDeliveryNotice.style.display = 'block';
      freeDeliveryNotice.innerHTML = '<strong>Free Delivery Unlocked!</strong> (Orders PKR 1,500+)';
    } else {
      freeDeliveryNotice.style.display = 'block';
      const remaining = 1500 - subtotal;
      freeDeliveryNotice.innerHTML = `Add <strong>PKR ${remaining}</strong> more for <strong>FREE Delivery</strong>!`;
    }
  }
}

// ==============================================================
// 3. 3D CARD FLIP RENDERING (POPULAR 19 & CATEGORIZED MENU)
// ==============================================================

function renderPopularItems() {
  const container = document.getElementById('popularGrid');
  if (!container) return;

  container.innerHTML = POPULAR_ITEMS.map((item, idx) => `
    <div class="card-flip-container" onclick="this.classList.toggle('flipped')">
      <div class="card-flip-inner">
        <!-- FRONT FACE -->
        <div class="card-front">
          <div class="card-img-wrap">
            <img class="card-img" src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'">
            <span class="dish-badge">Popular Choice</span>
            <span class="dish-rank">#${idx + 1}</span>
          </div>
          <div class="card-front-body">
            <span class="card-cat">${item.category}</span>
            <h3 class="card-title">${item.name}</h3>
            <div class="dish-rating" aria-label="${item.rating} out of 5">
              <svg class="ui-icon" aria-hidden="true"><use href="#icon-star"></use></svg>
              <svg class="ui-icon" aria-hidden="true"><use href="#icon-star"></use></svg>
              <svg class="ui-icon" aria-hidden="true"><use href="#icon-star"></use></svg>
              <svg class="ui-icon" aria-hidden="true"><use href="#icon-star"></use></svg>
              <svg class="ui-icon" aria-hidden="true"><use href="#icon-star"></use></svg>
              <span>${item.rating}</span>
            </div>
            <div class="card-front-footer">
              <span style="font-size: 1.25rem; font-weight: 800; color: var(--gold-primary);">PKR ${item.price}</span>
            </div>
          </div>
        </div>

        <!-- BACK FACE (Appetizing description + Add to Cart) -->
        <div class="card-back">
          <div class="card-back-header">
            <span class="card-cat">${item.category}</span>
            <h3 class="card-back-title">${item.name}</h3>
          </div>
          <div class="card-back-praise">
            "${item.praise}"
          </div>
          <div class="card-back-meta">
            <div class="card-back-price">PKR ${item.price}</div>
            <button class="btn-add-cart" onclick="addToCart(${item.id}, event)">
              <span>+</span> Add to Cart
            </button>
          </div>
        </div>
      </div>
      ${dishLikeButtonMarkup(item.id)}
    </div>
  `).join('');
  setupDishLikeButtonInteractions();
}

let activeCategory = 'ALL';
let searchQuery = '';

function renderCategoryMenu() {
  const container = document.getElementById('categoryGrid');
  if (!container) return;

  let filtered = FULL_CATEGORIZED_MENU;

  if (activeCategory !== 'ALL') {
    filtered = filtered.filter(item => item.category === activeCategory);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <h3>No dishes found matching your search</h3>
        <p style="margin-top: 8px;">Try searching for "Broast", "Karahi", "Tikka", or "Shake"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="card-flip-container" onclick="this.classList.toggle('flipped')">
      <div class="card-flip-inner">
        <!-- FRONT FACE -->
        <div class="card-front">
          <div class="card-img-wrap">
            <img class="card-img" src="${item.img || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'">
            <span class="dish-badge">${item.category}</span>
          </div>
          <div class="card-front-body">
            <span class="card-cat">${item.category}</span>
            <h3 class="card-title">${item.name}</h3>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px;">${item.desc}</p>
            <div class="card-front-footer">
              <span style="font-size: 1.05rem; font-weight: 800; color: var(--gold-primary);">${item.priceLabel}</span>
            </div>
          </div>
        </div>

        <!-- BACK FACE -->
        <div class="card-back">
          <div class="card-back-header">
            <span class="card-cat">${item.category}</span>
            <h3 class="card-back-title">${item.name}</h3>
          </div>
          <div class="card-back-praise">
            "${item.praise}"
          </div>
          <div class="card-back-meta">
            <div class="card-back-price">${item.priceLabel}</div>
            ${item.flavors ? `<label class="menu-option-label" for="menu-flavor-${item.id}">Choose flavor</label>
              <select id="menu-flavor-${item.id}" class="menu-option-select" onclick="event.stopPropagation()">
                ${item.flavors.map((flavor, index) => `<option value="${index}">${flavor}</option>`).join("")}
              </select>` : ""}
            ${item.options ? `<label class="menu-option-label" for="menu-option-${item.id}">Choose size</label>
              <select id="menu-option-${item.id}" class="menu-option-select" onclick="event.stopPropagation()">
                ${item.options.map((option, index) => `<option value="${index}">${option.label} — Rs. ${option.price}</option>`).join("")}
              </select>` : ""}
            ${item.price !== null || item.options
              ? `<button class="btn-add-cart" onclick="addToCart(${item.id}, event, ${item.options ? `document.getElementById('menu-option-${item.id}').value` : "undefined"}, ${item.flavors ? `document.getElementById('menu-flavor-${item.id}').value` : "undefined"})">
                  <span>+</span> Add to Cart
                </button>`
              : `<button class="btn-add-cart" type="button" disabled>${item.hasPriceRange ? "Confirm exact price" : "Price not listed"}</button>`}
          </div>
        </div>
      </div>
      ${dishLikeButtonMarkup(item.id)}
    </div>
  `).join('');
  setupDishLikeButtonInteractions();
}

function setupMenuCategoryTabs() {
  const tabs = document.querySelectorAll('.cat-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category || 'ALL';
      renderCategoryMenu();
    });
  });

  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCategoryMenu();
    });
  }
}

// ==============================================================
// 4. MODALS & DRAWER INTERACTIONS
// ==============================================================

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer) return;

  if (open) {
    drawer.classList.add('open');
    if (overlay) overlay.style.display = 'block';
  } else {
    drawer.classList.remove('open');
    if (overlay) overlay.style.display = 'none';
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function checkInitialBookingPopup() {
  if (document.body.dataset.page !== 'home' || !customerOrderPreferences) return;

  const hasSeen = sessionStorage.getItem('gohar_popup_shown');
  if (!hasSeen) {
    setTimeout(() => {
      openModal('tableBookingModal');
      sessionStorage.setItem('gohar_popup_shown', 'true');
    }, 700);
  }
}

// ==============================================================
// 5. API FETCH CALLS: BOOKING & ONLINE ORDERING
// ==============================================================

let lastCompletedBooking = null;

async function handleTableBooking(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const origText = submitBtn.textContent;

  const data = {
    name: form.bookName.value,
    phone: form.bookPhone.value,
    date: form.bookDate.value,
    time: form.bookTime.value,
    guests: parseInt(form.bookGuests.value || '2'),
    special_requests: form.bookNotes ? form.bookNotes.value : ''
  };

  try {
    submitBtn.textContent = 'Reserving...';
    submitBtn.disabled = true;

    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.success) {
      lastCompletedBooking = result.booking;
      form.reset();
      markInternalPageNavigation();
      window.location.assign('/reviews?after=booking');
    } else {
      alert('Error: ' + (result.error || 'Could not place reservation'));
    }
  } catch (err) {
    alert('Server connection error. Please WhatsApp 03339229300.');
  } finally {
    submitBtn.textContent = origText;
    submitBtn.disabled = false;
  }
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Please add items to your cart before checking out!");
    return;
  }
  toggleCartDrawer(false);

  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const isPickup = customerOrderPreferences?.orderType === 'pickup';
  const delivery = isPickup || subtotal >= 1500 ? 0 : 100;
  const total = subtotal + delivery;
  const address = document.getElementById('custAddress');
  const addressLabel = document.getElementById('custAddressLabel');
  const title = document.getElementById('checkoutTitle');
  const description = document.getElementById('checkoutDescription');
  const paymentDescription = document.getElementById('checkoutPaymentDescription');
  if (isPickup) {
    if (title) title.textContent = 'Restaurant Pickup';
    if (description) description.textContent = `Collect your order from Gohar Restaurant, Iqbal Market Road, Sector #11, Orangi Town. Selected area: ${customerOrderPreferences.area}.`;
    if (addressLabel) addressLabel.textContent = 'Pickup Location *';
    if (paymentDescription) paymentDescription.textContent = 'Cash on Pickup';
    if (address) {
      address.value = 'Pickup from Gohar Restaurant, Iqbal Market Road, Sector #11, Orangi Town, Karachi';
      address.readOnly = true;
      address.autocomplete = 'off';
    }
  } else {
    if (title) title.textContent = 'Fast Home Delivery';
    if (description) description.textContent = `Delivery area: ${customerOrderPreferences?.area || 'Karachi'}. Enter your full street address.`;
    if (addressLabel) addressLabel.textContent = 'Full Street & Area Address *';
    if (paymentDescription) paymentDescription.textContent = 'Cash on Delivery (COD)';
    if (address) {
      if (address.readOnly) address.value = '';
      address.readOnly = false;
      address.autocomplete = 'street-address';
      address.placeholder = `Enter your house, street and ${customerOrderPreferences?.area || 'area'}`;
    }
  }

  const summaryEl = document.getElementById('checkoutOrderSummary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="background: #25252a; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.88rem;">
        <div><strong>Order type:</strong> ${isPickup ? 'Pickup' : 'Delivery'}</div>
        <div><strong>Area:</strong> <span id="checkoutAreaSummary"></span></div>
        <div><strong>Total Items:</strong> ${cart.reduce((s, i) => s + i.qty, 0)}</div>
        <div><strong>Subtotal:</strong> PKR ${subtotal}</div>
        <div><strong>${isPickup ? 'Pickup' : 'Delivery'} fee:</strong> ${isPickup ? 'None' : delivery === 0 ? 'FREE' : 'PKR ' + delivery}</div>
        <div style="font-size: 1.1rem; color: var(--gold-primary); font-weight: bold; margin-top: 4px;">Grand Total: PKR ${total}</div>
      </div>
    `;
    const checkoutArea = document.getElementById('checkoutAreaSummary');
    if (checkoutArea) checkoutArea.textContent = customerOrderPreferences?.area || 'Karachi';
  }

  openModal('checkoutModal');
}

let lastCompletedOrder = null;

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const origText = submitBtn.textContent;

  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const isPickup = customerOrderPreferences?.orderType === 'pickup';
  const delivery_fee = isPickup || subtotal >= 1500 ? 0 : 100;
  let deliveryAddress = form.custAddress.value.trim();
  if (!isPickup && customerOrderPreferences?.area &&
      !deliveryAddress.toLowerCase().includes(customerOrderPreferences.area.toLowerCase())) {
    deliveryAddress = `${deliveryAddress}, ${customerOrderPreferences.area}, Karachi`;
  }

  const data = {
    customer_name: form.custName.value,
    phone: form.custPhone.value,
    address: deliveryAddress,
    notes: form.custNotes ? form.custNotes.value : '',
    delivery_fee: delivery_fee,
    payment_method: isPickup ? 'Cash on Pickup' : 'Cash on Delivery',
    items: cart
  };

  try {
    submitBtn.textContent = 'Placing Order...';
    submitBtn.disabled = true;

    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.success) {
      lastCompletedOrder = result.order;
      clearCart();
      form.reset();
      markInternalPageNavigation();
      window.location.assign('/reviews?after=order');
    } else {
      alert('Error: ' + (result.error || 'Failed to place order'));
    }
  } catch (err) {
    alert('Server connection error. Please call/WhatsApp 03339229300.');
  } finally {
    submitBtn.textContent = origText;
    submitBtn.disabled = false;
  }
}

// ==============================================================
// 6. INVOICE RENDERING: FOOD ORDERS & TABLE RESERVATIONS
// ==============================================================

function viewOrderInvoice(orderData) {
  const order = orderData || lastCompletedOrder;
  if (!order) {
    showToast("No active order details to print invoice.");
    return;
  }

  const invoiceContainer = document.getElementById('invoiceContent');
  if (!invoiceContainer) return;

  const items = Array.isArray(order.items) ? order.items : [];

  invoiceContainer.innerHTML = `
    <div class="invoice-header">
      <div class="invoice-brand">
        <img class="invoice-logo-img" src="/static/logo.png" alt="Gohar Restaurant Logo">
        <div>
          <h2 style="font-size: 1.5rem; color: #1a1a1a;">Gohar Restaurant</h2>
          <div style="font-size: 0.95rem; font-weight: bold; color: #b37400;">گوھر ریسٹورینٹ - اورنگی ٹاؤن، کراچی</div>
          <p style="color: #666; font-size: 0.78rem;">Iqbal Market Road, Sector #11, Near Khuda Buksh Bakers, Orangi Town, Karachi</p>
          <p style="color: #666; font-size: 0.78rem;"><strong>Contact / WhatsApp:</strong> 03339229300</p>
        </div>
      </div>
      <div style="text-align: right;">
        <h3 style="color: #c69500; font-size: 1.2rem; font-weight: 800;">FOOD ORDER INVOICE</h3>
        <p style="font-size: 0.8rem; color: #555;"><strong>Invoice #:</strong> ${order.order_number}</p>
        <p style="font-size: 0.8rem; color: #555;"><strong>Date:</strong> ${order.created_at || new Date().toLocaleString()}</p>
        <p style="font-size: 0.8rem; color: #10B981;"><strong>Status:</strong> ${order.status}</p>
      </div>
    </div>

    <div class="invoice-details-grid">
      <div>
        <h5 style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Customer Details</h5>
        <p style="font-size: 0.95rem; font-weight: bold; color: #222;">${order.customer_name}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Delivery Address:</strong> ${order.address}</p>
      </div>
      <div>
        <h5 style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Order Specifications</h5>
        <p><strong>Payment:</strong> ${order.payment_method || 'Cash on Delivery'}</p>
        <p><strong>Instructions:</strong> ${order.notes || 'None'}</p>
        <p><strong>Estimated Delivery:</strong> 30 - 45 Minutes</p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item Description</th>
          <th style="text-align: center;">Price</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((it, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${it.name}${it.variant ? ` — ${it.variant}` : ""}</strong></td>
            <td style="text-align: center;">PKR ${it.price}</td>
            <td style="text-align: center;">${it.qty}</td>
            <td style="text-align: right;">PKR ${it.price * it.qty}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="invoice-totals">
      <div class="invoice-totals-row">
        <span>Subtotal:</span>
        <span>PKR ${order.subtotal}</span>
      </div>
      <div class="invoice-totals-row">
        <span>Delivery Fee:</span>
        <span>${order.delivery_fee === 0 ? 'FREE' : 'PKR ' + order.delivery_fee}</span>
      </div>
      <div class="invoice-totals-row grand-total">
        <span>Grand Total:</span>
        <span>PKR ${order.total_price}</span>
      </div>
    </div>

    <div style="text-align: center; font-size: 0.76rem; color: #777; border-top: 1px dashed #ccc; padding-top: 14px; margin-top: 14px;">
      <p>*** Thank You for Choosing Gohar Restaurant (Est. 1993)! ***</p>
      <p>Karachi's Taste of Tradition • For inquiries or catering reservations, call <strong>03339229300</strong>.</p>
    </div>
  `;

  openModal('invoiceModal');
}

function viewReservationInvoice(bookingData) {
  const booking = bookingData || lastCompletedBooking;
  if (!booking) {
    showToast("No reservation details found.");
    return;
  }

  const invoiceContainer = document.getElementById('invoiceContent');
  if (!invoiceContainer) return;

  invoiceContainer.innerHTML = `
    <div class="invoice-header">
      <div class="invoice-brand">
        <img class="invoice-logo-img" src="/static/logo.png" alt="Gohar Restaurant Logo">
        <div>
          <h2 style="font-size: 1.5rem; color: #1a1a1a;">Gohar Restaurant</h2>
          <div style="font-size: 0.95rem; font-weight: bold; color: #b37400;">گوھر ریسٹورینٹ - اورنگی ٹاؤن، کراچی</div>
          <p style="color: #666; font-size: 0.78rem;">Iqbal Market Road, Sector #11, Near Khuda Buksh Bakers, Orangi Town, Karachi</p>
          <p style="color: #666; font-size: 0.78rem;"><strong>Contact / WhatsApp:</strong> 03339229300</p>
        </div>
      </div>
      <div style="text-align: right;">
        <h3 style="color: #c69500; font-size: 1.2rem; font-weight: 800;">TABLE RESERVATION RECEIPT</h3>
        <p style="font-size: 0.8rem; color: #555;"><strong>Booking Ref:</strong> ${booking.booking_code}</p>
        <p style="font-size: 0.8rem; color: #555;"><strong>Booked On:</strong> ${booking.created_at || new Date().toLocaleString()}</p>
        <p style="font-size: 0.8rem; color: #10B981;"><strong>Status:</strong> ${booking.status}</p>
      </div>
    </div>

    <div class="invoice-details-grid">
      <div>
        <h5 style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Guest Details</h5>
        <p style="font-size: 0.95rem; font-weight: bold; color: #222;">${booking.name}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Party Size:</strong> ${booking.guests} Guests</p>
      </div>
      <div>
        <h5 style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Dining Schedule</h5>
        <p><strong>Reservation Date:</strong> ${booking.date}</p>
        <p><strong>Seating Time:</strong> ${booking.time}</p>
        <p><strong>Special Notes:</strong> ${booking.special_requests || 'Standard Family Table'}</p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Service Description</th>
          <th style="text-align: center;">Guests</th>
          <th style="text-align: right;">Reservation Fee</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <strong>Guaranteed Table Seating Reservation</strong><br>
            <small style="color: #666;">AC Family Hall Seating with priority dinner service</small>
          </td>
          <td style="text-align: center;">${booking.guests} Persons</td>
          <td style="text-align: right; color: #10B981; font-weight: bold;">Complimentary (PKR 0)</td>
        </tr>
      </tbody>
    </table>

    <div class="invoice-totals">
      <div class="invoice-totals-row">
        <span>Reservation Fee:</span>
        <span>PKR 0.00</span>
      </div>
      <div class="invoice-totals-row grand-total">
        <span>Balance Due:</span>
        <span>Pay as you Dine</span>
      </div>
    </div>

    <div style="text-align: center; font-size: 0.76rem; color: #777; border-top: 1px dashed #ccc; padding-top: 14px; margin-top: 14px;">
      <p>*** Please present this booking receipt or code (${booking.booking_code}) at our reception upon arrival ***</p>
      <p>Tables are held for 20 minutes from the reserved time. Questions? WhatsApp us at <strong>03339229300</strong>.</p>
    </div>
  `;

  openModal('invoiceModal');
}

function printCurrentInvoice() {
  window.print();
}

// ==============================================================
// 7. GOHAR AI ASSISTANT CHATBOT INTEGRATION
// ==============================================================

const chatHistory = [];

function toggleAssistantChat() {
  const windowEl = document.getElementById('assistantChatWidget');
  if (!windowEl) return;
  windowEl.classList.toggle('active');
  if (windowEl.classList.contains('active')) {
    const input = document.getElementById('assistantChatInput');
    if (input) input.focus();
  }
}

async function sendAssistantMessage(customText) {
  const inputEl = document.getElementById('assistantChatInput');
  const messagesBox = document.getElementById('assistantChatMessages');
  if (!messagesBox) return;

  const text = customText || (inputEl ? inputEl.value.trim() : '');
  if (!text) return;

  if (inputEl) inputEl.value = '';

  appendChatBubble('user', text);
  chatHistory.push({ role: 'user', content: text });

  const typingId = 'typing-' + Date.now();
  const typingEl = document.createElement('div');
  typingEl.id = typingId;
  typingEl.className = 'chat-bubble bot';
  typingEl.innerHTML = '<span style="opacity: 0.7;">Gohar Support is responding...</span>';
  messagesBox.appendChild(typingEl);
  messagesBox.scrollTop = messagesBox.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: chatHistory.slice(0, -1) })
    });
    const data = await res.json();

    const typingElem = document.getElementById(typingId);
    if (typingElem) typingElem.remove();

    if (data.success) {
      appendChatBubble('bot', data.response);
      chatHistory.push({ role: 'assistant', content: data.response });
    } else {
      appendChatBubble('bot', 'Sorry, I encountered an issue. You can call us directly at 03339229300.');
    }
  } catch (err) {
    const typingElem = document.getElementById(typingId);
    if (typingElem) typingElem.remove();
    appendChatBubble('bot', 'Connecting to Gohar Customer Support... For instant helpline, WhatsApp us at 03339229300.');
  }
}

function appendChatBubble(role, text) {
  const messagesBox = document.getElementById('assistantChatMessages');
  if (!messagesBox) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;

  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  bubble.innerHTML = formatted;
  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

// ==============================================================
// 8. TOAST SYSTEM
// ==============================================================

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<svg class="ui-icon" aria-hidden="true"><use href="#icon-utensils"></use></svg><div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

async function loadCustomerReviews() {
  const reviewsList = document.getElementById('customerReviewsList');
  if (!reviewsList) return;

  const response = await fetch('/api/reviews');
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Could not load reviews.');
  }

  const average = Number(data.average_rating || 0);
  const averageEl = document.getElementById('reviewsAverage');
  const countEl = document.getElementById('reviewsCount');
  const starsEl = document.getElementById('reviewsAverageStars');
  if (averageEl) averageEl.textContent = average.toFixed(1);
  if (countEl) countEl.textContent = `(${data.review_count} reviews)`;
  if (starsEl) {
    starsEl.textContent = '★'.repeat(Math.round(average)) + '☆'.repeat(5 - Math.round(average));
    starsEl.setAttribute('aria-label', `${average.toFixed(1)} out of 5 stars`);
  }

  reviewsList.replaceChildren();
  if (data.reviews.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'reviews-empty-state';
    emptyState.textContent = 'No reviews yet. Be the first to share your experience!';
    reviewsList.appendChild(emptyState);
    return;
  }

  data.reviews.forEach((review) => {
    const card = document.createElement('article');
    card.className = 'customer-review-card';
    const heading = document.createElement('div');
    heading.className = 'customer-review-card-heading';
    const name = document.createElement('strong');
    name.textContent = review.customer_name;
    const stars = document.createElement('span');
    stars.className = 'customer-review-stars';
    stars.textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    stars.setAttribute('aria-label', `${review.rating} out of 5 stars`);
    const comment = document.createElement('p');
    comment.textContent = review.comment;
    const date = document.createElement('time');
    date.textContent = review.created_at;
    heading.append(name, stars);
    card.append(heading, comment, date);
    reviewsList.appendChild(card);
  });
}

async function submitCustomerReview(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById('reviewFormMessage');
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  message.textContent = '';
  message.classList.remove('is-error');
  submitButton.disabled = true;

  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: formData.get('customer_name'),
        rating: Number(formData.get('rating')),
        comment: formData.get('comment')
      })
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Could not submit your review.');
    }

    form.reset();
    message.textContent = data.message;
    try {
      await loadCustomerReviews();
    } catch (error) {
      message.textContent = `${data.message} Refresh the page if the review does not appear.`;
    }
  } catch (error) {
    message.textContent = error.message || 'Could not submit your review. Please try again.';
    message.classList.add('is-error');
  } finally {
    submitButton.disabled = false;
  }
}

function setupHeroCarousel() {
  const carousel = document.getElementById('heroCarousel');
  if (!carousel || document.body.dataset.page !== 'home') return;

  const section = carousel.closest('.hero-carousel-section');
  const slides = Array.from(carousel.querySelectorAll('.hero-carousel-slide'));
  const dotsContainer = section?.querySelector('.hero-carousel-dots');
  const previousButton = section?.querySelector('.hero-carousel-prev');
  const nextButton = section?.querySelector('.hero-carousel-next');
  if (slides.length !== 2 || !dotsContainer || !previousButton || !nextButton) return;

  const useMobileImages = window.matchMedia('(max-width: 768px)').matches;
  const imageNumbers = Array.from({ length: 13 }, (_, index) => index + 1)
    .filter((imageNumber) => imageNumber !== 2);
  const images = imageNumbers.map((imageNumber) => (
    useMobileImages
      ? `/static/mobile/image${imageNumber}.webp`
      : `/static/image${imageNumber}.png`
  ));
  if (!useMobileImages) slides[0].src = images[0];
  const dots = images.map((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'hero-carousel-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show image ${imageNumbers[index]} of ${images.length}`);
    dot.setAttribute('aria-pressed', String(index === 0));
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
    return dot;
  });

  let currentIndex = 0;
  let activeSlide = 0;
  let timer = null;
  let isPaused = false;
  let isTransitioning = false;

  function clearTimer() {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  }

  function setCurrentSlide(index, nextSlide) {
    slides[activeSlide].classList.remove('is-active');
    activeSlide = nextSlide;
    slides[activeSlide].classList.add('is-active');
    carousel.classList.remove('is-transitioning');
    currentIndex = index;
    isTransitioning = false;
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-pressed', String(dotIndex === currentIndex));
    });
    if (!isPaused) scheduleNext();
  }

  function showSlide(index) {
    if (index === currentIndex || isTransitioning) return;
    clearTimer();
    isTransitioning = true;
    const nextSlide = 1 - activeSlide;
    const preloader = new Image();
    preloader.onload = () => {
      slides[nextSlide].src = images[index];
      carousel.classList.add('is-transitioning');
      window.setTimeout(() => setCurrentSlide(index, nextSlide), 480);
    };
    preloader.onerror = () => {
      console.error(`Could not load carousel image: ${images[index]}`);
      isTransitioning = false;
      if (!isPaused) scheduleNext();
    };
    preloader.src = images[index];
  }

  function scheduleNext() {
    clearTimer();
    if (isPaused) return;
    timer = window.setTimeout(() => {
      showSlide((currentIndex + 1) % images.length);
    }, 4000);
  }

  previousButton.addEventListener('click', () => {
    showSlide((currentIndex - 1 + images.length) % images.length);
  });
  nextButton.addEventListener('click', () => {
    showSlide((currentIndex + 1) % images.length);
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide((currentIndex - 1 + images.length) % images.length);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide((currentIndex + 1) % images.length);
    }
  });

  section.addEventListener('mouseenter', () => {
    isPaused = true;
    clearTimer();
  });
  section.addEventListener('mouseleave', () => {
    isPaused = false;
    scheduleNext();
  });

  scheduleNext();
}

// ==============================================================
// 9. INITIALIZATION
// ==============================================================

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('admin-body')) return;

  startWelcomeFlow();
  setupHeroCarousel();
  setupPizzaSliceScroll();
  loadCustomerAccount();

  const orderSetupForm = document.getElementById('orderSetupForm');
  if (orderSetupForm) {
    orderSetupForm.addEventListener('submit', saveCustomerOrderPreferences);
  }
  document.querySelectorAll('input[name="orderType"]').forEach((input) => {
    input.addEventListener('change', () => {
      document.querySelectorAll('input[name="orderType"]').forEach((option) => {
        option.closest('.order-type-option')?.classList.toggle('is-selected', option.checked);
      });
    });
  });
  const customerAreaSelect = document.getElementById('customerArea');
  const customCustomerArea = document.getElementById('customCustomerArea');
  if (customerAreaSelect && customCustomerArea) {
    customerAreaSelect.addEventListener('change', () => {
      const isCustom = customerAreaSelect.value === 'Other Karachi area';
      customCustomerArea.hidden = !isCustom;
      customCustomerArea.required = isCustom;
      if (!isCustom) customCustomerArea.value = '';
    });
  }
  const editOrderPreferences = document.getElementById('editOrderPreferences');
  if (editOrderPreferences) {
    editOrderPreferences.addEventListener('click', showOrderSetup);
  }
  document.querySelectorAll('.customer-auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => setCustomerAuthMode(tab.dataset.authMode));
  });
  const customerAccountForm = document.getElementById('customerAccountForm');
  if (customerAccountForm) {
    customerAccountForm.addEventListener('submit', submitCustomerAccount);
  }
  document.getElementById('customerAccountLogout')?.addEventListener('click', logoutCustomerAccount);

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');
  const mobileNavLabel = mobileNavToggle?.querySelector('.mobile-nav-label');
  if (mobileNavToggle && primaryNavigation) {
    const closeNavigation = () => {
      primaryNavigation.classList.remove('is-open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      mobileNavToggle.setAttribute('aria-label', 'Open navigation menu');
      if (mobileNavLabel) {
        mobileNavLabel.textContent = 'Menu';
      }
    };

    mobileNavToggle.addEventListener('click', () => {
      const isOpen = primaryNavigation.classList.toggle('is-open');
      mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
      mobileNavToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      if (mobileNavLabel) {
        mobileNavLabel.textContent = isOpen ? 'Close' : 'Menu';
      }
    });

    primaryNavigation.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNavigation();
      }
    });
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || link.target === '_blank' ||
        event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const destination = new URL(link.href, window.location.href);
    if (destination.origin === window.location.origin &&
        destination.pathname !== window.location.pathname) {
      markInternalPageNavigation();
    }
  }, true);

  loadCart();
  renderPopularItems();
  renderCategoryMenu();
  loadDishLikes().catch((error) => {
    console.error('Could not load dish likes:', error);
  });
  setupMenuCategoryTabs();
  checkInitialBookingPopup();
  setupScrollReveal();

  const bookingForm = document.getElementById('tableBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleTableBooking);
  }

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }

  const customerReviewForm = document.getElementById('customerReviewForm');
  if (customerReviewForm) {
    customerReviewForm.addEventListener('submit', submitCustomerReview);
    const postAction = new URLSearchParams(window.location.search).get('after');
    const reviewPrompt = document.getElementById('postActionReviewPrompt');
    if (reviewPrompt && (postAction === 'order' || postAction === 'booking')) {
      reviewPrompt.textContent = postAction === 'order'
        ? 'Your food order is placed! While it is being prepared, please share a quick rating and comment.'
        : 'Your table booking is confirmed! Please share a quick rating and comment about Gohar Restaurant.';
      reviewPrompt.hidden = false;
    }
    loadCustomerReviews().catch((error) => {
      const message = document.getElementById('reviewFormMessage');
      if (message) {
        message.textContent = error.message || 'Could not load reviews.';
        message.classList.add('is-error');
      }
    });
  }

  const assistantInput = document.getElementById('assistantChatInput');
  if (assistantInput) {
    assistantInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendAssistantMessage();
      }
    });
  }
});
