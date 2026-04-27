# 🔐 SIMBA SUPERMARKET - ADMIN SYSTEM GUIDE

## ✅ COMPLETE ROLE-BASED SYSTEM IMPLEMENTED

---

## 👥 USER ROLES

### 1. **CUSTOMER** (Default)
- **How to create:** Sign up with any email + password
- **Access:** Shopping, cart, orders, reviews
- **Cannot:** Access admin features

### 2. **ADMIN** (Approved by SuperAdmin)
- **How to become:** 
  1. Create customer account
  2. Click "Request Admin Access" on landing page
  3. Fill form with reason
  4. Wait for SuperAdmin approval
- **Access:** 
  - ✅ Product management (add/remove/stock)
  - ✅ Order management (update status)
  - ✅ Customer management (assign discounts)
  - ✅ Review management (flag/unflag)
  - ✅ Inventory control
- **Cannot:** Approve other admins, access SuperAdmin panel

### 3. **SUPERADMIN** (Top Level)
- **Email:** humureenock@gmail.com
- **Password:** Mataru@8
- **Access:** EVERYTHING
  - ✅ All admin features
  - ✅ Approve/reject admin requests
  - ✅ Revoke admin access
  - ✅ View all users
  - ✅ System analytics
  - ✅ Manage all admins

---

## 🚀 HOW TO USE

### **For SuperAdmin (humureenock@gmail.com):**

1. **Login:**
   - Click "🔐 Admin Login" button in navbar
   - Email: humureenock@gmail.com
   - Password: Mataru@8

2. **Approve Admins:**
   - Scroll to "SuperAdmin Panel" section on landing page
   - Click "👑 Open SuperAdmin Panel"
   - View pending admin requests
   - Click "✅ Approve" or "❌ Reject"

3. **Manage Admins:**
   - Go to "Approved" tab
   - View all active admins
   - Click "🔒 Revoke Access" to remove admin privileges

4. **Access Admin Features:**
   - Click "🔐 Admin panel" button (green, fixed position)
   - Manage products, orders, customers, reviews

---

### **For Regular Users (Want to become Admin):**

1. **Create Account:**
   - Click "Account" in navbar
   - Sign up with email + password

2. **Request Admin Access:**
   - Scroll to "Admin Access" section on landing page
   - Click "📝 Request Admin Access"
   - Fill form:
     - Name
     - Email
     - Phone
     - Password
     - Reason for admin access
   - Submit request

3. **Wait for Approval:**
   - SuperAdmin will review your request
   - You'll be notified (check by logging in again)

4. **Once Approved:**
   - Login with your email + password
   - You'll see "🔐 Admin" badge in navbar
   - Access admin panel via green button

---

## 🎯 ADMIN CAPABILITIES

### **Product Management:**
- Add new products
- Update product details
- Toggle stock availability
- Remove products

### **Order Management:**
- View all orders
- Update order status:
  - 📥 Received
  - 🛒 Picking
  - 📦 Packing
  - 🚚 On the Way
  - ✅ Delivered
- Track order details

### **Customer Management:**
- View all customers
- Assign loyalty discounts (0%, 5%, 10%, 15%, 20%)
- View purchase history
- Search customers

### **Review Management:**
- View all branch reviews
- Flag inappropriate reviews
- Unflag reviews
- Monitor customer feedback

---

## 🔒 SECURITY

- ✅ Password hashing (Base64 for demo)
- ✅ Role-based access control
- ✅ SuperAdmin-only features protected
- ✅ Admin approval workflow
- ✅ Session management

---

## 📊 SYSTEM FLOW

```
CUSTOMER
   ↓
Request Admin Access
   ↓
SUPERADMIN Reviews
   ↓
   ├─→ APPROVED → User becomes ADMIN
   └─→ REJECTED → User stays CUSTOMER
```

---

## 🎨 UI INDICATORS

- **Customer:** "New shopper" badge
- **Admin:** "🔐 Admin" badge (green)
- **SuperAdmin:** "🔐 Admin" badge + SuperAdmin panel access

---

## 📝 NOTES

- SuperAdmin account is auto-created on first app load
- Admin requests stored in localStorage
- User roles stored in user profiles
- All data persists across sessions

---

## ✅ BUILD STATUS

**Build:** Successful ✅
**Size:** 472.63 kB JS, 56.76 kB CSS
**All Features:** Working ✅

---

**Made with 🇷🇼 in Kigali, Rwanda**
