# 🛠️ Mern stack task management 

## 📌 Objective

Build a MERN stack application with the following features:

- Admin login system
- Agent creation and management
- Uploading and distributing contact lists among agents

---

## ✅ Features

### 1. 🧑‍💼 User Login

- Login with Email and Password
- JWT-based authentication
- MongoDB-stored user credentials
- Redirect on success, error message on failure

### 2. 👥 Add Agents

- Add agents with:
  - Name
  - Email
  - Mobile number (with country code)
  - Password

### 3. 📂 Upload & Distribute Lists

- Upload CSV, XLSX, or XLS files
- Validate file format and content
- Format:  
FirstName | Phone | Notes

yaml
Copy
Edit
- Distribute entries equally among 5 agents
- Store distributed tasks in MongoDB
- Display assigned tasks on frontend

---

## ⚙️ Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **File Parsing**: `csv-parse`, `xlsx`

---

## 🚀 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Swayamhp/agentTaskManagement.git
```
cd AgentTaskManagement
## 2. Backend Setup
```bash
cd backend
npm install
```
## Create a .env file inside backend
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
## cors origin changing 
### the cors origin will look like this 
```bash
  app.use(cors({
  origin: 'https://agenttaskmanagement.netlify.app' // deployed dev server URL
}));
```
### change to your frontend server
```bash
app.use(cors({
    rigin: 'http://localhost:5173' // React dev server URL

}));
```
## run the backend
```bash
npm run dev
```
### you see something like 
server running 5000 port 
mongodb connected

## 3. Frontend Setup
back to main folder by cd ..
### move the frontedn folder
```bash
cd frontend
```
### Install dependencies
```bash 
npm install
```
## Create a .env file inside frontend:
```bash
VITE_API_URL=http://localhost:5000 // or your local server in backend
```
## Start the frontend:
```bash
npm run dev
```

## 🚀 Live Demo

You can try out the live version of the project here:

🔗 [Live Demo](https://agenttaskmanagement.netlify.app)

> Note: It may take a few seconds to load because the backend is hosted on Render's free tier and may be asleep.

