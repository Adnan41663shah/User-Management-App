# 👥 User Management Web App

A full-stack CRUD web application built using **Node.js**, **Express.js**, **EJS**, and **MySQL** that allows users to be created, updated, viewed, and deleted with form-based input. Designed with clean views and proper route handling, this project is ideal for practicing backend development and database integration.

---

## 📌 Features

- 🔄 **CRUD Operations**: Create, Read, Update, and Delete user records
- 🛡️ **Password Check** before editing or deleting users
- 📋 **Form-based input** with validation
- 📂 **EJS templates** for clean, server-side rendered UI
- 🔗 **UUID** used for unique user identification
- 🔢 **Bulk insert** of fake users using `faker.js`

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Templating Engine:** EJS
- **Database:** MySQL
- **Middleware:** method-override, express.urlencoded
- **UUID:** For unique user IDs
- **Faker.js:** For generating random fake users

---


🔍 Project Structure

user-management-app/
├── views/
│   ├── home.ejs
│   ├── showusers.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   └── delete.ejs
├── public/
│   └── (your CSS/images if any)
├── app.js
├── package.json
└── README.md

📦 Optional: Generate Fake Users
You can generate 100+ fake users using faker.js:


👨‍💻 Author
Adnan Shah
B.Tech CSE | Java, MERN Stack Learner

📄 License
This project is open-source and free to use for learning purposes.
