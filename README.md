## Name - Tenzin Singye

## Intern Id - CITS2235

## No. of Weeks - 8

## Project Name - A full-stack *Learning Management System* developed using the *MERN Stack* (MongoDB, Express.js, React.js, Node.js).

## Project Scope - The scope of the Learning Management System is to develop a centralized web-based platform that simplifies and manages online learning. The system enables administrators, instructors, and students to securely manage courses, enrollments, lessons, assignments, and users through a role-based web application.

---

# ✨ Features

## 🔐 Authentication System

- User registration
- User login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected API routes
- Role-based authorization

### Available Roles:

- 👨‍💼 Admin
- 👨‍🏫 Instructor
- 👨‍🎓 Student

---

# 👥 User Management

Admin can:

- Create users
- View all users
- Update user information
- Delete users
- Assign user roles

User information includes:

- Name
- Email
- Password (encrypted)
- Role

---

# 📚 Course Management

Admin and Instructor can:

- Create courses
- View course details
- Update course information
- Delete courses

Course information includes:

- Course Title
- Instructor
- Category
- Duration
- Description

---

# 🎓 Enrollment Management

Admin and Instructor can:

- View all enrollments
- Update enrollment status
- Delete enrollments

Students can:

- View available courses
- Enroll in courses
- View enrolled courses

Enrollment information includes:

- Student
- Course
- Status

---

# 📖 Lesson Management

Admin and Instructor can:

- Create lessons
- View lessons
- Update lessons
- Delete lessons

Students can:

- View lessons of enrolled courses

Lesson information includes:

- Lesson Title
- Course
- Description

---

# 📝 Assignment Management

Admin and Instructor can:

- Create assignments
- View assignments
- Update assignments
- Delete assignments

Students can:

- View assignments of enrolled courses

Assignment information includes:

- Assignment Title
- Course
- Description
- Due Date

---

# 📊 Dashboard

The dashboard provides role-based overviews.

### 👨‍💼 Admin Dashboard

- Total Users
- Total Courses
- Total Enrollments
- Total Lessons
- Total Assignments

### 👨‍🏫 Instructor Dashboard

- Total Courses
- Total Enrollments
- Total Lessons
- Total Assignments

### 👨‍🎓 Student Dashboard

- My Courses
- My Lessons
- My Assignments

---

# 🛠️ Technologies Used

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap
- React Icons
- Vite

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

## Database

- MongoDB
- Mongoose

---

# 📂 Project Structure

text
Learning-Management-System

│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
└── backend
    │
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    └── server.js

---

# ⚙️ Installation and Setup

## 1. Clone Repository

git clone https://github.com/TenzinSingye2026/Learning-Management-System

---

# Backend Setup

Go to backend folder:

cd backend

Install dependencies:

npm install

Create a .env file:

env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/learning_management

JWT_SECRET=mysecretkey456

Start backend server:

npm start

Backend runs on:

http://localhost:5000

---

# Frontend Setup

Open another terminal.

Go to frontend folder:

cd frontend

Install dependencies:

npm install

Start React application:

npm run dev

Frontend runs on:

http://localhost:5173

---

# 🔒 Security Features

- Password encryption using bcrypt
- JWT authentication
- Protected routes
- Role-based access control
- Environment variable protection

---

# 🚀 Improvements over the Previous Project

- Redesigned from a healthcare domain to an education platform.
- Added role-specific dashboards.
- Student course enrollment system.
- Student-only course, lesson, and assignment views.
- Complete user management (Create, Read, Update, Delete).
- Separate MongoDB database for LMS.
- Improved navigation and UI.
- Better modular backend architecture.

---

# 🚀 Future Improvements

Possible future enhancements:

- Assignment submission by students
- Assignment grading by instructors
- Quiz and examination module
- Student progress tracking
- Course completion certificates
- File upload for lessons
- Email notifications
- Discussion forums
- Attendance management

---

# ⭐ Project Purpose

This project was developed as an internship and learning project to demonstrate full-stack web development skills using the MERN Stack. It showcases authentication, role-based authorization, REST APIs, CRUD operations, database management, and modern frontend development using React.