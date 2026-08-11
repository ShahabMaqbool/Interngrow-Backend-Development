
# 🏢 HR Management API (Week 02)

A professional RESTful HR Management System API built using **Node.js**, **Express.js**, and **PostgreSQL**.

This project was developed as part of the **InternGrow Backend Development Program - Week 02**.

---

# 🚀 Features

## Core Modules

- ✅ Departments CRUD
- ✅ Designations CRUD
- ✅ Employees CRUD
- ✅ Attendance CRUD
- ✅ Leave Management CRUD
- ✅ Payroll Records CRUD

---

## Additional Features

- 🔍 Employee Search
- 🎯 Employee Filtering
- 📄 Pagination
- 🖼 Profile Image Upload
- 📝 Audit Logs
- 📊 CSV Export
- 📄 PDF Export
- ♻️ Soft Delete
- 🔐 Role-Based Authorization (Middleware)

---

# 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Multer
- JSON Web Token (JWT)
- PDFKit
- json2csv

---

# 📂 Project Structure

```
Week2-HR-Management-API
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── package.json
│   └── server.js
│
├── database
│   └── hr_management_db.sql
│
├── screenshots
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Go inside project

```bash
cd Week2-HR-Management-API/backend
```

Install packages

```bash
npm install
```

Create `.env`

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=hr_management_db

JWT_SECRET=your_secret_key
```

Run Server

```bash
npm run dev
```

---

# 📌 API Endpoints

## Departments

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/departments |
| GET | /api/departments |
| GET | /api/departments/:id |
| PUT | /api/departments/:id |
| DELETE | /api/departments/:id |

---

## Designations

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/designations |
| GET | /api/designations |
| GET | /api/designations/:id |
| PUT | /api/designations/:id |
| DELETE | /api/designations/:id |

---

## Employees

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/employees |
| GET | /api/employees |
| GET | /api/employees/:id |
| PUT | /api/employees/:id |
| DELETE | /api/employees/:id |

---

## Attendance

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/attendance |
| GET | /api/attendance |
| GET | /api/attendance/:id |
| PUT | /api/attendance/:id |
| DELETE | /api/attendance/:id |

---

## Leave Management

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/leaves |
| GET | /api/leaves |
| GET | /api/leaves/:id |
| PUT | /api/leaves/:id |
| DELETE | /api/leaves/:id |

---

## Payroll

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/payroll |
| GET | /api/payroll |
| GET | /api/payroll/:id |
| PUT | /api/payroll/:id |
| DELETE | /api/payroll/:id |

---

## Export

| Method | Endpoint |
|----------|----------------------------|
| GET | /api/export/employees/csv |
| GET | /api/export/employees/pdf |

---

# 📸 Screenshots

The `screenshots` folder contains API testing results for:

- Departments CRUD
- Designations CRUD
- Employees CRUD
- Attendance CRUD
- Leave CRUD
- Payroll CRUD
- Search
- Filtering
- Pagination
- Profile Image Upload
- Audit Logs
- CSV Export
- PDF Export
- Soft Delete

---

# 📦 Database

Database schema is available in:

```
database/hr_management_db.sql
```

---

# 👨‍💻 Developed By

**Shahab Maqbool**

BS Information Technology

InternGrow Backend Development Program

---

# 📜 License

This project is developed for educational purposes.