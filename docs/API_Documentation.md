# Smart-Task-Flow REST API Documentation

This document describes the API endpoints exposed by the Smart-Task-Flow Node/Express backend. All requests and responses are in JSON format.

## Authentication Endpoints

### 1. User Registration
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "name": "Alex Johnson",
    "email": "alex@email.com",
    "password": "strong-password"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "60a87f2b9b1d8e001c8f343a",
      "name": "Alex Johnson",
      "email": "alex@email.com"
    }
  }
  ```

### 2. User Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "email": "alex@email.com",
    "password": "strong-password"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "60a87f2b9b1d8e001c8f343a",
      "name": "Alex Johnson",
      "email": "alex@email.com",
      "role": "Lead Architect"
    }
  }
  ```

---

## Task Endpoints

### 1. Get All Tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  [
    {
      "_id": "60a88b1f9b1d8e001c8f343b",
      "title": "Configure Supabase Tables",
      "description": "Create profiles and tasks relations in cloud db",
      "status": "In Progress",
      "priority": "High",
      "category": "Development",
      "dueDate": "2026-06-15",
      "aiScore": 85,
      "urgency": "Immediate",
      "deadlineAnalysis": "Due in 4 days. Critical bottleneck.",
      "suggestedAction": "Complete schema setup before Friday sync.",
      "timeEstimate": "4h"
    }
  ]
  ```

### 2. Create Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body Parameters**:
  ```json
  {
    "title": "Configure Supabase Tables",
    "description": "Create profiles and tasks relations in cloud db",
    "status": "In Progress",
    "priority": "High",
    "category": "Development",
    "dueDate": "2026-06-15",
    "timeEstimate": "4h"
  }
  ```
- **Response**: `201 Created` (returns the new task with auto-calculated AI metrics)

### 3. Re-optimize Task Priorities
- **URL**: `/api/tasks/optimize`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  {
    "message": "Priorities re-optimized",
    "tasks": [ ... ]
  }
  ```

---

## Analytics Endpoints

### 1. Get Analytics Profile
- **URL**: `/api/analytics`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  {
    "_id": "60a89d0f9b1d8e001c8f343c",
    "pomodoroMinutesToday": 110,
    "focusHistory": [
      {
        "duration": 25,
        "category": "Development",
        "date": "2026-06-11"
      }
    ]
  }
  ```

### 2. Log Pomodoro Session
- **URL**: `/api/analytics/focus`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body Parameters**:
  ```json
  {
    "duration": 25,
    "category": "Development"
  }
  ```
- **Response**: `201 Created`
