# 🔐 User Access Management System

A full-stack application for managing user access to software, built with **Node.js**, **Express.js**, **React**, **TypeORM**, and **PostgreSQL**.

---

## 📋 Project Overview

This project allows organizations to manage software access requests and approvals with three user roles: **Employee**, **Manager**, and **Admin**.

---

## ✨ Features Implemented

- 🔑 **User Registration & Login** with JWT authentication  
- 👥 **Role-based access**: Employees, Managers, Admins  
- 💻 **Software Management**: Admins can add new software and define access levels  
- 📝 **Access Requests**: Employees can request access to specific software  
- ✅ **Request Approval**: Managers can view, approve, or reject access requests  
- 🔒 **Secure password handling** using bcrypt  
- 🗄️ **PostgreSQL database** with TypeORM entities and relations  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** React  
- **Database:** PostgreSQL  
- **ORM:** TypeORM  
- **Authentication:** JWT  
- **Other Tools:** bcrypt, dotenv, nodemon  

---

## 👤 User Roles

- 👨‍💼 **Employee:** Can register, log in, and request software access  
- 👩‍💼 **Manager:** Can view and manage (approve/reject) access requests  
- 🔧 **Admin:** Can create software and has full access  

---

## ⚡ Main Functionalities

- 🚪 **Sign-Up & Login:** JWT-based authentication, role-based redirection  
- 📱 **Software Management:** Admins can add software with access levels (Read/Write/Admin)  
- 🙋‍♀️ **Request Access:** Employees submit requests for software access  
- ⚖️ **Approve/Reject Requests:** Managers handle pending requests  

---

## 🌐 API Endpoints

- `POST /api/auth/signup` — Register (default role: Employee)  
- `POST /api/auth/login` — Login (returns JWT and role)  
- `POST /api/software` — Add new software (Admin only)  
- `POST /api/requests` — Submit access request (Employee)  
- `PATCH /api/requests/:id` — Approve or reject request (Manager)  

---

## 🗃️ Database Entities (TypeORM)

### 👤 User
- `id`, `username`, `password`, `role`

### 💻 Software
- `id`, `name`, `description`, `accessLevels`

### 📋 Request
- `id`, `user`, `software`, `accessType`, `reason`, `status`

---

## 🖼️ Project Screenshots

### 🔐 Login Page
![Login Page](./assets/screenshots/login.png)

---

### 🏠 Dashboard
![Dashboard](./assets/screenshots/dashboard.png)

---

### 📝 Access Request Form
![Access Request Form](./assets/screenshots/access-request.png)

---

### ✅ Manager Approval Panel
![Manager Panel](./assets/screenshots/manager-panel.png)

---

### 🛠️ Admin - Add Software
![Admin Add Software](./assets/screenshots/admin-add-software.png)

---

## 🚀 How to Run

### 🖥️ Backend

1. Go to the `server` folder:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file with your PostgreSQL credentials and JWT secret:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=yourusername
    DB_PASSWORD=yourpassword
    DB_NAME=useraccessdb
    JWT_SECRET=yourjwtsecret
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```

### 🎨 Frontend

1. Go to the `client` folder:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React app:
    ```bash
    npm start
    ```

---


---

## ✅ What's Covered

- ✔️ All core features described in the assignment  
- 🧩 Modular code structure for both backend and frontend  
- 🔐 Secure authentication and password storage  
- 🗄️ PostgreSQL integration with TypeORM  
- 🛡️ Role-based access and redirection  

---

## 📄 License

For educational use only.


