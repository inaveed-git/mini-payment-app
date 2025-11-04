
# **Mini-Payment-App**

*Empowering Seamless Payments, Instantly and Securely*

![last-commit](https://img.shields.io/github/last-commit/inaveed-git/mini-payment-app?style=flat\&logo=git\&logoColor=white\&color=0080ff)
![language](https://img.shields.io/github/languages/top/inaveed-git/mini-payment-app?style=flat\&color=0080ff)

---

## **Overview**

Mini-Payment-App is a **full-stack payment platform** that allows users to register, sign in, check their balance, and transfer funds securely. It uses a modern **TypeScript/Node.js backend** with **Express and MongoDB** and a **React + Vite frontend** for a responsive UI.

**Core Features:**

*  **Authentication:** Secure JWT-based sign up/sign in.
*  **Balance Management:** Check balance and transfer funds between users.
*  **User Management:** Search users and update profile info.
*  **Validation & Security:** Zod validation and middleware to protect API routes.

---

## **Tech Stack**

**Backend:**

* Node.js, TypeScript, Express
* MongoDB + Mongoose
* JWT for authentication
* Zod for validation

**Frontend:**

* React, TypeScript, Vite
* Recoil for state management
* Tailwind CSS for UI
* Axios for API requests

**Others:**

* ESLint for code linting
* dotenv for environment variables

---

## **Getting Started**

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/inaveed-git/mini-payment-app
cd mini-payment-app
```

---

### **2️⃣ Backend Setup**

1. Navigate to the backend folder (if separate, e.g., `cd backend`).
2. Install dependencies:

```bash
npm install
```

3. Rename `.simple.env` to `.env`
4. Add environment variables to `.env` file:

```env
PORT=5000
# Local MongoDB
# MONGO_URI=mongodb://127.0.0.1:27017/mydb

# MongoDB Atlas
MONGO_URI=mongodb+srv://nkeagle2022:e2UgzRqoIkL6c51k@cluster0.sapc3cl.mongodb.net/?appName=Cluster0

JWTSECRET=keysecret
```

5. Start backend server:

```bash
npm start
```

> Backend will run at **[http://localhost:5000](http://localhost:5000)**

---

### **3️⃣ Frontend Setup**

1. Navigate to the frontend folder (if separate, e.g., `cd frontend`).
2. Install dependencies:

```bash
npm install
```

3. Rename `.simple.env` to `.env`
4. Add environment variables to `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

5. Start frontend server:

```bash
npm run dev
```

> Frontend will run at **[http://localhost:5173](http://localhost:5173)** (or as Vite shows in terminal)

---

## **4️⃣ API Routes Overview**

**Authentication**

* `POST /auth/signup` → Register a new user
* `POST /auth/signin` → Login user
* `GET /auth/me` → Get current logged-in user (requires JWT)

**Balance**

* `GET /amount` → Get current user balance (requires JWT)
* `POST /transfer` → Transfer balance to another user (requires JWT)

**User Management**

* `GET /find?search=` → Search users
* `PUT /name` → Update first & last name (requires JWT)

---

## Screenshots

### Dashboard
![Dashboard Screenshot](screenshots/dashboard.png)

### Transfer Funds
![Transfer Screenshot](screenshots/transfer.png)

### Signup Page
![Signup Screenshot](screenshots/signup.png)

### Signin Page
![Signin Screenshot](screenshots/signin.png)

---

## **6️⃣ License**

MIT License © 2025

---

