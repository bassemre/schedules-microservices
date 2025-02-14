# 🛠️ Schedules Microservices

This monorepo contains two microservices for managing and executing scheduled jobs using **NestJS, BullMQ (Redis), and PostgreSQL**. The system is containerized with **Docker Compose** for easy deployment and management.

## 📂 Project Structure

```
├── docker-compose.yml  # Docker configuration
├── jobs-schedules.api/  # API service for scheduling jobs
├── workers-service/     # Worker service for processing jobs
```

## 🚀 Services Overview

### 1️⃣ **Jobs Schedules API (jobs-schedules.api)**

- Built with **NestJS & TypeORM**
- Exposes RESTful APIs to **create, list, and manage scheduled jobs**
- Stores jobs metadata in **PostgreSQL**
- Uses **Redis** for tracking job execution states
- Works as the producer, **pushing jobs to Redis**

### 2️⃣ **Workers Service (workers-service)**

- Built with **NestJS & BullMQ**
- Fetches and executes jobs from **Redis Queue**
- Updates **job execution status** in **PostgreSQL**
- Runs as a separate microservice (consumer)
- Uses **Redis for job queueing**

## ⚙️ Environment Variables

Each service reads configurations from `.env` files.

#### 🗂️ **Jobs Schedules API - **``

```
PORT=3000
POSTGRES_HOST=db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=schedules_jobs
REDIS_HOST=redis
REDIS_PORT=6379
```

#### 🏗️ **Workers Service - **``

```
REDIS_HOST=redis
REDIS_PORT=6379
POSTGRES_HOST=db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=schedules_jobs
```

## 🐳 Running with Docker Compose

### 📦 **Step 1: Clone and Navigate**

```bash
git clone <your-repo-url>
cd schedules-microservices
```

### 🏗️ **Step 2: Build and Start Services**

```bash
docker-compose up --build
```

This will:

- Start **PostgreSQL** and **Redis**
- Launch **Jobs Schedules API**
- Launch **Workers Service**

### 🔄 **Step 3: Verify Running Containers**

```bash
docker ps
```

You should see:

```
CONTAINER ID   IMAGE               STATUS
xxxxxxxxxx     schedules-api       Up
xxxxxxxxxx     workers-service     Up
xxxxxxxxxx     redis               Up
xxxxxxxxxx     postgres            Up
```

## 📡 API Endpoints

### **1️⃣ Create a Job**

```http
POST /jobs
```

```json
{
  "name": "Send Email",
  "interval": "10m",
  "parameters": { "email": "user@example.com" }
}
```

### **2️⃣ Get All Jobs**

```http
GET /jobs
```

### **3️⃣ Get Job by ID**

```http
GET /jobs/:id
```

## 📌 Notes

- Ensure **Redis (port 6379)** and **PostgreSQL (port 5432)** are accessible.
- Jobs are scheduled using **BullMQ**, leveraging Redis repeatable jobs.
- The worker processes jobs asynchronously and updates their status.
