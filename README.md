
# 🗳️ Polling / Voting Application

A simple and professional **Polling/Voting Application** built using **React (Frontend)** and **Node.js + Express (Backend)**.
Users can view polls, vote on options, and see real-time results, while admins can create and delete polls.

---

## 🚀 Features

### 👤 User Features

* View all available polls
* View poll details with options
* Vote on a poll (single vote per session)
* Change selected option before submitting
* View poll results with:

  * Vote count
  * Percentage distribution
* Clean and responsive UI

### 🛠️ Admin Features

* Create new polls
* Add multiple options to a poll
* Delete existing polls

---

## 🧑‍💻 Tech Stack

### Frontend

* React
* React Router
* Material UI (MUI)
* Bootstrap (utility classes)

### Backend

* Node.js
* Express.js
* File-based database (`db.json`)

---

## 📁 Project Structure

```
polling-app/
│
├── backend/
│   ├── controllers/
│   │   └── pollController.js
│   ├── routes/
│   │   └── pollRoutes.js
│   ├── db.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── PollList.jsx
│   │   │   ├── PollDetail.jsx
│   │   │   ├── CreatePoll.jsx
│   │   │   └── Results.jsx
│   │   ├── components/
│   │   │   └── BackButton.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ▶️ How to Run the Project

### Backend

```bash
cd backend
npm install
node server.js
```

Runs on: `http://localhost:5000`

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on: `http://localhost:3000`

---

## 🧠 Application Overview

* **Poll List Page** → Displays all poll questions
* **Poll Detail Page** → Allows users to select and submit votes
* **Results Page** → Shows vote percentages and total votes
* **Create Poll Page** → Admin can create polls with multiple options

---

## 👨‍💻 Author

**Abhyuday Pawar**
Web Developer | MERN Stack

---
