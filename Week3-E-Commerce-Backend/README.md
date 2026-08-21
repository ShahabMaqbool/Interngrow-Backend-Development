
# Week 3 – E-Commerce Backend API

## 📌 Project Overview

This project is developed as part of the **InternGrow Backend Development Program – Week 3**.

The objective of this week is to develop a scalable backend for an online shopping platform with multiple e-commerce modules and RESTful APIs.

---

## 🚀 Modules Implemented

### 1. Categories
- Create Category
- Get All Categories
- Get Category By ID
- Update Category
- Delete Category

### 2. Products
- Create Product
- Get All Products
- Get Product By ID
- Update Product
- Delete Product
- Product Image Upload
- Product Search
- Category Filtering
- Price Filtering
- Pagination

### 3. Customers
- Create Customer
- Get All Customers
- Get Customer By ID
- Update Customer
- Delete Customer

### 4. Shopping Cart
- Add Product to Cart
- Get Customer Cart
- Update Cart Quantity
- Remove Product from Cart
- Clear Customer Cart

### 5. Orders
- Create Order
- Get All Orders
- Get Order By ID
- Update Order Status
- Delete Order
- Order Items

### 6. Wishlist
- Add Product to Wishlist
- Get Customer Wishlist
- Remove Product from Wishlist
- Clear Customer Wishlist

### 7. Reviews
- Create Review
- Get Product Reviews
- Get Review By ID
- Update Review
- Delete Review
- Rating Validation

### 8. Coupons
- Create Coupon
- Get All Coupons
- Get Coupon By ID
- Update Coupon
- Delete Coupon
- Percentage and Fixed Discount Types
- Coupon Activation Status
- Expiry Date

### 9. Inventory
- Create Inventory
- Get All Inventory
- Get Inventory By ID
- Update Inventory Quantity
- Delete Inventory
- Stock Quantity Validation

### 10. Order Tracking
- Add Tracking Information
- Get Order Tracking
- Update Tracking Status
- Tracking Number

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- PostgreSQL
- REST APIs
- JavaScript
- Multer
- CORS
- dotenv
- Postman
- Git & GitHub

---

## 📁 Project Structure

```text
Week3-E-Commerce-Backend/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── upload.js
│   │
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── customerController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── wishlistController.js
│   │   ├── reviewController.js
│   │   ├── couponController.js
│   │   ├── inventoryController.js
│   │   └── trackingController.js
│   │
│   ├── models/
│   │   ├── categoryModel.js
│   │   ├── productModel.js
│   │   ├── customerModel.js
│   │   ├── cartModel.js
│   │   ├── orderModel.js
│   │   ├── wishlistModel.js
│   │   ├── reviewModel.js
│   │   ├── couponModel.js
│   │   ├── inventoryModel.js
│   │   └── trackingModel.js
│   │
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── inventoryRoutes.js
│   │   └── trackingRoutes.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── database/
├── postman/
└── screenshots/