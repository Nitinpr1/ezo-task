# Task management API

A task management API built with **Node.js**, **Express**, **TypeScript** and **MongoDB**.

---

## 🚀 Base URL

`http://localhost:5000/api`


---

## 📌 Authentication

- Users must register and log in to get access.
- Authentication is handled via JWT tokens.

---

## 👤 User APIs

### 1️ Register User
**POST** `/user/register`

**Request Body:**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "64f7a1d9a7...",
    "username": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2 Login 
**POST** `/user/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "ghkkjbhbjkjjj....."
}
```

---

### 3 Get User list 
**GET** `/user/`

**Response:**

```json
{
    "success": true,
    "users": [
         {
            "_id": "68a7564b16668fc16bdb36db",
            "name": "Some user",
            "email": "hey@gmail.com",
            "password": "$2b$10$/gFOT9NrjZQ3Ka/mYbPEAO4Njz.b/QbetB1RORugFuTIRBrOzf0qW",
            "createdAt": "2025-08-21T17:24:27.480Z",
            "updatedAt": "2025-08-21T17:24:27.480Z",
            "__v": 0
        },
        {
            "_id": "68ac444b1a1ca706b29a42b3",
            "name": "Mukesh",
            "email": "Mukesh@gmail.com",
            "password": "$2b$10$ML4vS39vEQp10mWf8H25yONJB6CJNMTDoJtMYs8TfUy02PluBxYOy",
            "createdAt": "2025-08-25T11:08:59.878Z",
            "updatedAt": "2025-08-25T11:08:59.878Z",
            "__v": 0
        }
    ]
}
```

---


###  Note: All task routes require authentication.
Pass token in headers:
`Authorization: Bearer <token>`

## ✅ Task APIs

### 1️ Create Task
**POST** `/tasks/`

**Request Body**

```json
{
  "title": "Some title",
  "description": "some description",
  "status": "pending"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Task created successfully",
}
```

### 2 Get All Tasks
**GET** `/tasks/`

**Response:**

```json
[
  {
    "id": "64f7b2a1d...",
    "title": "some title",
    "description": "some description",
    "status": "pending",
    "createdAt": "2025-08-21T10:00:00Z"
  }
]
```

### 3 Get Task by ID
**GET** `/tasks/:id`

**Response:**

```json
{
    "id": "64f7b2a1d...",
    "title": "some title",
    "description": "some description",
    "status": "pending",
    "createdAt": "2025-08-21T10:00:00Z"
}
```

### 4 Update Task
**PUT** `/tasks/:id`

**Request Body:**

```json
{
  "title": "Some title ",
  "description": "some description...",
  "status": "completed"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Task updated successfully"
}
```

### 5 Delete Task
**DELETE** `/tasks/:id`

**Response:**

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

##  Setup Instructions

# Clone the repository
```git clone `https://github.com/Nitinpr1/ezo-task.git` ```

# Navigate to project directory
```cd ezo-task```

# Install dependencies
```npm install```

# Start the server
```npm run dev```

Server will start on `http://localhost:5000`







