
# Week 01 - Authentication API

## 📌 Project Overview

This project was developed as part of the **InternGrow Backend Development Internship (Week 01)**.

It is a REST API built with **Node.js**, **Express.js**, and **PostgreSQL** that implements a complete authentication system.

---

## 🚀 Features

- User Registration
- User Login (JWT Authentication)
- Protected Routes
- Get User Profile
- Update Profile
- Change Password
- Forgot Password
- Reset Password
- Email Verification
- Role-Based Authorization (Admin/User)
- Password Hashing using bcrypt
- Mailtrap Email Integration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- Nodemailer
- Mailtrap
- Postman

---

## 📂 Project Structure

```
Week-01-Authentication-API
│
├── backend
├── database
├── postman
├── screenshots
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Move into Backend Folder

```bash
cd Week-01-Authentication-API/backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=auth_api_db

JWT_SECRET=your_secret_key

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_username
MAIL_PASS=your_mailtrap_password
```

### Run Server

```bash
npm run dev
```

---

## 📮 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | Get Profile |
| PUT | /api/auth/profile | Update Profile |
| PUT | /api/auth/change-password | Change Password |
| POST | /api/auth/forgot-password | Forgot Password |
| POST | /api/auth/reset-password | Reset Password |
| GET | /api/auth/verify-email/:token | Verify Email |
| GET | /api/auth/admin | Admin Route |

---

## 📁 Database

Database SQL file is available in:

```
database/auth_api.sql
```

---

## 📬 Postman Collection

Postman collection is available in:

```
postman/Authentication_API.postman_collection.json
```

---

## 📷 Screenshots

Project screenshots are available inside the **screenshots** folder.

---

## 👨‍💻 Developed By

**Shahab Maqbool**

InternGrow Backend Development Internship

Week 01