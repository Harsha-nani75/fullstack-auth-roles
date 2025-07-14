
```markdown
# 🔐 Full-Stack Login & Role-Based Access Control System

A complete user authentication system with role-based access using React, Node.js, MySQL, and JWT. Includes registration, login, role-specific dashboards, and OTP-based password reset via Gmail.

---

## 🚀 Tech Stack

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express, MySQL
- **Auth:** JWT, Bcrypt
- **Email Service:** Nodemailer with Gmail App Password

---

## 📁 Folder Structure

```

fullstack-auth/
├── client/       # React Frontend
├── server/       # Node.js Backend
└── README.md

````

---

## 🔧 Backend Setup

```bash
cd server
npm install
````

### Create `.env` in `/server` folder:

```
PORT=4902
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=auth_system
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

> 📌 Generate your Gmail App Password here: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### Start Backend:

```bash
node server.js
```

---

## 💻 Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

## ✅ Features

* ✅ User Registration (Admin/User/Supervisor)
* ✅ Login with JWT Token
* ✅ Protected Dashboard Based on Role
* ✅ Forgot Password with OTP via Gmail
* ✅ Session stored in `localStorage`

---

## 🔐 API Routes (Server)

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/request-otp`
* `POST /api/auth/reset-password`
* `GET /api/user/admin-data`
* `GET /api/user/user-data`
* `GET /api/user/supervisor-data`

---

## 📮 Gmail App Password Setup

1. Enable 2-Step Verification: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Visit: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create a password for **Mail > Other > NodeMailer**
4. Use this password in your `.env` as `EMAIL_PASS`

---

## 🔐 JWT Token Handling (Frontend)

* Stored in `localStorage`
* Sent in headers using Axios:

```js
headers: { Authorization: token }
```

---

## 🧪 Test Flow

1. Register as Admin/User/Supervisor
2. Login → redirected to dashboard
3. Click “Forgot Password” → receive OTP via email
4. Submit OTP & New Password → login with updated password

---

## 🙋‍♂️ Author

**Harsha Vardhan**
GitHub: [@Harsha-nani75](https://github.com/Harsha-nani75)

```

---

Let me know if you'd like the `.env.example`, `.gitignore`, or deployment guide added too.
```
