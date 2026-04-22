# Simba Supermarket - Rwanda E-Commerce Platform

A modern, fast-delivery supermarket web application inspired by Getir, built specifically for Kigali, Rwanda. Features real-time inventory management, multi-language support, loyalty programs, and an AI-powered product search assistant.

![Simba Supermarket](https://img.shields.io/badge/Rwanda-E31B23?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMjJDMTcuNTIyOCAyMiAyMiAxNy41MjI4IDIyIDEyQzIyIDYuNDc3MTUgMTcuNTIyOCAyIDEyIDJDNi40NzcxNSAyIDIgNi40NzcxNSAyIDEyQzIgMTcuNTIyOCA2LjQ3NzE1IDIyIDEyIDIyWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Explained](#-key-features-explained)
- [Admin Panel](#-admin-panel)
- [Multi-Language Support](#-multi-language-support)
- [Data Persistence](#-data-persistence)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### Customer Features
- **Fast Product Search** - Search across 600+ products by name, category, or keywords
- **Smart Filtering** - Filter by categories, stock availability, and service type
- **Shopping Cart** - Add/remove items with real-time price calculation
- **Loyalty Discounts** - Automatic discount application based on customer tier
- **Multi-Language** - Full support for English, Kinyarwanda, French, and Swahili
- **Dark/Light Mode** - Toggle between themes for comfortable browsing
- **Location-Based Delivery** - Select from 8 Kigali delivery zones
- **Guest Checkout** - Shop without creating an account
- **User Accounts** - Save order history and build loyalty over time
- **SimbaBot AI Assistant** - Instant product search with natural language

### Admin Features
- **Business Dashboard** - Real-time analytics and KPIs
- **Order Management** - Track orders through 5-stage delivery pipeline
- **Inventory Control** - Toggle product availability instantly
- **Customer Management** - View profiles, order history, and assign loyalty tiers
- **Revenue Tracking** - Monitor total sales and active orders
- **Top Customers** - Identify and reward best customers
- **Stock Alerts** - Track out-of-stock items

### Service Types
1. **Supermarket** - Groceries, household essentials, drinks
2. **Restaurant** - Coffee shop items, quick food, ready-to-enjoy products
3. **Bakery** - Bread, pastries, cakes, breakfast items

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Lightning-fast build tool
- **CSS3** - Custom styling with CSS variables for theming

### State Management
- **React Context API** - Global state for cart, user, products, settings
- **localStorage** - Client-side persistence for orders, profiles, and preferences

### Data
- **JSON** - Product catalog with 600+ items
- **Local Storage** - User profiles, orders, cart state

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Type checking
- **Vite HMR** - Hot module replacement for fast development

---

## 🏁 Getting Started

### Prerequisites
- **Node.js** 16.x or higher
- **npm** 7.x or higher

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/simba-supermarket.git
cd simba-supermarket
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
simba/
├── public/                      # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                  # Images and media
│   │   ├── hero.png
│   │   └── simbaheaderM.png
│   ├── components/              # React components
│   │   ├── AdminPanel.tsx       # Admin dashboard
│   │   ├── CartDrawer.tsx       # Shopping cart sidebar
│   │   ├── Hero.tsx             # Homepage hero section
│   │   ├── Navbar.tsx           # Top navigation
│   │   ├── ProductCard.tsx      # Product display card
│   │   ├── ProductModal.tsx     # Product detail modal
│   │   ├── Sidebar.tsx          # Category filter sidebar
│   │   ├── SimbaBot.tsx         # AI product search assistant
│   │   └── UserModal.tsx        # Login/signup modal
│   ├── context/                 # React Context providers
│   │   ├── CartContext.tsx      # Cart state & order management
│   │   ├── ProductContext.tsx   # Product catalog & inventory
│   │   ├── SettingsContext.tsx  # Language & theme settings
│   │   └── UserContext.tsx      # User authentication & profiles
│   ├── hooks/                   # Custom React hooks
│   │   ├── useProducts.ts       # Product filtering & search
│   │   └── useSimbaAI.ts        # AI product search logic
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # Global app styles
│   ├── i18n.ts                  # Internationalization config
│   ├── index.css                # CSS reset & variables
│   ├── main.tsx                 # Application entry point
│   └── simba_products.json      # Product catalog (600+ items)
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

---

## 🎯 Key Features Explained

### 1. SimbaBot - AI Product Search

**Location:** `src/components/SimbaBot.tsx` + `src/hooks/useSimbaAI.ts`

SimbaBot is an intelligent product search assistant that helps customers find products instantly.

**How it works:**
- User types a product name (e.g., "milk", "bread", "coffee")
- Bot searches the catalog by product name and category
- Returns up to 5 ranked results with prices
- User clicks a result to open the product modal

**Features:**
- Keyword-based search with stop-word filtering
- Scoring system (name match = 2pts, category match = 1pt)
- Works offline (no external API required)
- Available to all users (guests and logged-in)

**Example Usage:**
```
User: "milk"
Bot: Found 3 products matching "milk":
  → Inyange milk 1L - 1,600 RWF
  → Mukamira Whole milk 250ml - 450 RWF
  → Dairy Top uht Whole Milk 500ml - 1,000 RWF
```

### 2. Shopping Cart & Checkout

**Location:** `src/context/CartContext.tsx` + `src/components/CartDrawer.tsx`

**Features:**
- Add/remove items with quantity stepper
- Real-time price calculation
- Automatic loyalty discount application
- Three payment methods: Card, Cash on Delivery, Mobile Money
- Order persistence in localStorage

**Discount Calculation:**
```typescript
subtotal = sum of (price × quantity) for all items
discount = subtotal × (loyaltyPercentage / 100)
total = subtotal - discount
```

### 3. User Authentication & Loyalty

**Location:** `src/context/UserContext.tsx` + `src/components/UserModal.tsx`

**User Profile Structure:**
```typescript
{
  name: string;
  email: string;
  phone?: string;              // Optional, for loyalty tracking
  visitCount: number;          // Auto-incremented on login
  totalPurchases: number;      // Order count
  manualDiscount: number;      // Admin-assigned discount (0-20%)
}
```

**Loyalty Tiers:**
- **Standard** (0%) - New customers
- **Bronze** (5%) - Admin-assigned
- **Silver** (10%) - Admin-assigned
- **Gold** (15%) - Admin-assigned
- **Platinum** (20%) - VIP customers

**Phone Number Format:**
- Accepts: `+250788695675` or `0788695675`
- Auto-normalizes to: `+250788695675`
- Valid prefixes: `+25078`, `+25079`, `+25072`, `+25073`

### 4. Multi-Language Support

**Location:** `src/i18n.ts` + `src/context/SettingsContext.tsx`

**Supported Languages:**
- 🇬🇧 **English** (en)
- 🇷🇼 **Kinyarwanda** (rw)
- 🇫🇷 **Français** (fr)
- 🇹🇿 **Kiswahili** (sw)

**Translation Coverage:**
- UI labels and buttons
- Product categories
- Common product keywords (milk, bread, coffee, etc.)
- Error messages and notifications

**How to add a new language:**
1. Add language code to `Language` type in `i18n.ts`
2. Add translations to `translations` object
3. Add category translations to `categoryTranslations`
4. Add product word translations to `productWordTranslations`

### 5. Product Catalog

**Location:** `src/simba_products.json`

**Product Structure:**
```json
{
  "id": 66001,
  "name": "Inyange Low Fat Milk 500ML",
  "price": 800,
  "category": "Cosmetics & Personal Care",
  "subcategoryId": 66,
  "inStock": true,
  "image": "https://res.cloudinary.com/...",
  "unit": "Pcs"
}
```

**Statistics:**
- **600+ products** across 7 main categories
- **50+ subcategories** for detailed filtering
- **Real product images** from Cloudinary CDN
- **Price range:** 50 RWF - 750,000 RWF

**Categories:**
1. Alcoholic Drinks
2. Baby Products
3. Cosmetics & Personal Care
4. Food Products
5. General
6. Kitchenware & Electronics
7. Sports & Wellness

---

## 🔐 Admin Panel

**Access:** Only users logged in with phone number `+250788695675` (0788695675)

### Dashboard Tab

**Key Metrics:**
- 💰 Total Revenue (sum of all orders)
- 📦 Total Orders (all-time)
- 👥 Registered Customers
- 📋 Products in Catalog
- ⚠️ Active Orders (not delivered)
- ❌ Out of Stock Items

**Insights:**
- Top 5 customers by order count
- 10 most recent orders with status

### Orders Tab

**Order Lifecycle:**
1. **📥 Received** - Order placed by customer
2. **🛒 Picking** - Staff collecting items
3. **📦 Packing** - Items being packaged
4. **🚚 On the Way** - Out for delivery
5. **✅ Delivered** - Order completed

**Features:**
- View all orders with customer email
- See item breakdown with quantities and prices
- Update order status with dropdown
- Color-coded status badges
- Orders persist in localStorage

### Inventory Tab

**Features:**
- Search products by name or category
- View product count in real-time
- Toggle stock status (In Stock / Out of Stock)
- Changes reflect instantly on storefront
- Product image, name, category, and price displayed

**Use Cases:**
- Mark items out of stock when inventory depleted
- Re-enable products when restocked
- Quick search for specific items

### Customers Tab

**Features:**
- Search by name, email, or phone
- View customer profiles with order history
- Assign loyalty discounts (0%, 5%, 10%, 15%, 20%)
- VIP badge for customers with active discounts
- Customer count display

**Loyalty Tiers:**
```
0%  - Standard (default)
5%  - Bronze
10% - Silver
15% - Gold
20% - Platinum (VIP)
```

**Admin Actions:**
1. Search for customer
2. Select discount tier from dropdown
3. Discount applies automatically on next purchase

---

## 🌍 Multi-Language Support

### Switching Languages

Users can switch languages from the navbar dropdown. The selection is saved to localStorage and persists across sessions.

### Translation Files

**Location:** `src/i18n.ts`

**Structure:**
```typescript
export const translations = {
  en: { /* English translations */ },
  rw: { /* Kinyarwanda translations */ },
  fr: { /* French translations */ },
  sw: { /* Swahili translations */ }
}
```

### Adding New Translations

1. **UI Labels:**
```typescript
translations.en.newLabel = "New Label";
translations.rw.newLabel = "Akarango Gashya";
translations.fr.newLabel = "Nouvelle Étiquette";
translations.sw.newLabel = "Lebo Mpya";
```

2. **Product Categories:**
```typescript
categoryTranslations["New Category"] = {
  en: "New Category",
  rw: "Icyiciro Gishya",
  fr: "Nouvelle Catégorie",
  sw: "Jamii Mpya"
};
```

3. **Product Keywords:**
```typescript
productWordTranslations.rw.newword = "ijambo rishya";
productWordTranslations.fr.newword = "nouveau mot";
productWordTranslations.sw.newword = "neno jipya";
```

---

## 💾 Data Persistence

All data is stored in browser `localStorage` for demo purposes. In production, this should be replaced with a backend API.

### Stored Data

**1. User Profiles** (`simba_profiles`)
```json
{
  "user@example.com": {
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+250788695675",
    "visitCount": 5,
    "totalPurchases": 3,
    "manualDiscount": 10
  }
}
```

**2. Current Session** (`simba_current_session`)
```
"user@example.com"
```

**3. Orders** (`simba_orders`)
```json
[
  {
    "id": "ORD-1234567890",
    "items": [...],
    "total": 15000,
    "status": "delivered",
    "timestamp": 1234567890,
    "customerEmail": "user@example.com"
  }
]
```

**4. Settings** (`simba_settings`)
```json
{
  "language": "en",
  "theme": "light"
}
```

### Clearing Data

To reset the application:
```javascript
localStorage.clear();
location.reload();
```

---

## 🔧 Environment Variables

Currently, the app doesn't require environment variables. All configuration is in the code.

**Optional:** If you want to add OpenAI integration for SimbaBot (not currently implemented):

Create `.env` file:
```env
VITE_OPENAI_API_KEY=sk-your-key-here
```

---

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
```

### Production
```bash
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint
```

### Type Checking
```bash
tsc -b               # TypeScript type check (no emit)
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Production Deploy**
```bash
vercel --prod
```

### Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy `dist/` folder** via Netlify dashboard or CLI

### Manual Deployment

1. **Build**
```bash
npm run build
```

2. **Upload `dist/` folder** to any static hosting service (AWS S3, GitHub Pages, etc.)

---

## 🎨 Customization

### Brand Colors

**Location:** `src/index.css`

```css
:root {
  --simba-primary: #e31b23;      /* Simba Red */
  --simba-secondary: #ffd200;    /* Simba Gold */
  --simba-orange: #f28c28;       /* Accent Orange */
}
```

### Admin Phone Number

**Location:** `src/i18n.ts`

```typescript
export const ADMIN_PHONE = '+250788695675';
```

Change this to your admin phone number.

### Delivery Locations

**Location:** `src/App.tsx`

```typescript
const rwandaLocations = [
  'Kigali CBD',
  'Kimironko',
  'Kacyiru',
  // Add more locations here
];
```

---

## 🐛 Known Limitations

1. **No Backend** - All data stored in localStorage (not suitable for production)
2. **No Payment Integration** - Payment methods are UI-only
3. **No Real Delivery** - Delivery tracking is simulated
4. **Client-Side Admin** - Admin authentication is not secure (phone number check only)
5. **No Image Upload** - Product images are hardcoded URLs

### Production Recommendations

For a production deployment, implement:
- ✅ Backend API (Node.js, Python, etc.)
- ✅ Database (PostgreSQL, MongoDB, etc.)
- ✅ JWT authentication
- ✅ Payment gateway (Stripe, Flutterwave, MTN Mobile Money)
- ✅ Real-time order tracking
- ✅ Email notifications
- ✅ SMS notifications for delivery updates
- ✅ Image CDN for product photos
- ✅ Admin dashboard with proper authentication

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact

**Simba Supermarket Rwanda**
- Phone: +250 788 695 675
- Website: [simbasupermarket.rw](https://simbasupermarket.rw)
- Location: Kigali, Rwanda

---

## 🙏 Acknowledgments

- Inspired by [Getir](https://getir.com) - Fast delivery model
- Product data from Simba Supermarket Rwanda
- Built with ❤️ for the Rwandan market

---

**Made with 🇷🇼 in Kigali, Rwanda**
