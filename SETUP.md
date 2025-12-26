# 🚀 Setup Guide

Welcome to the MongoDB Learning Lab! Follow these steps to get up and running quickly.

## ⚡ Quick Start (Recommended)

We have provided a unified script to set up your environment (Docker, Dependencies, Data Seeding).

**Prerequisites:**
1.  [Docker Desktop](https://www.docker.com/products/docker-desktop/) (must be running).
2.  [Node.js](https://nodejs.org/) (v18+).
3.  [Python](https://www.python.org/) (v3.10+, Optional).
4.  [.NET SDK](https://dotnet.microsoft.com/en-us/download) (v8.0+, Optional).

**Run the initialization script:**

```powershell
./init-lab.ps1
```

This script will:
-   Start MongoDB and Mongo Express via Docker.
-   Install Node.js dependencies (`npm install`).
-   Install Python dependencies (`pip install`).
-   Seed the database with 1M+ sample documents.

---

## 🔑 Default Credentials

Permissions are configured in `docker-compose.yml` and `.env`.

| Service | Address | Username | Password |
| :--- | :--- | :--- | :--- |
| **MongoDB** | `mongodb://localhost:27017` | `admin` | `password` |
| **Mongo Express** | [http://localhost:8081](http://localhost:8081) | `admin` | `pass` |

> **Note**: The connection string is: `mongodb://admin:password@localhost:27017`

---

## 🛠 Manual Setup

If you prefer to set up manually without the script:

### 1. Configuration
Create the environment file:
```bash
cp .env.example .env
```

### 2. Start Infrastructure
Start the database and GUI containers:
```bash
docker-compose up -d
```

### 3. Install Dependencies
```bash
# Node.js
npm install

# Python (Optional)
pip install -r requirements.txt
```

### 4. Seed Data
Populate the database with sample data:
```bash
npm run seed
```

---

## 🏃 Running Labs

You can run the labs in your preferred language from the root directory.

### 🟢 Module 1: Beginner

**Node.js**
```bash
node docs/01-beginner/labs/node/01-crud-practice.js
```

**Python**
```bash
python docs/01-beginner/labs/python/crud_practice.py
```

**C#**
```bash
dotnet run --project docs/01-beginner/labs/csharp/MongoLab.csproj
```

### 🟡 Module 2: Intermediate

**Node.js**
```bash
node docs/02-intermediate/labs/node/01-aggregation-builders.js
```

**Python**
```bash
python docs/02-intermediate/labs/python/aggregation_builders.py
```

**C#**
```bash
dotnet run --project docs/02-intermediate/labs/csharp/MongoIntermediate.csproj
```
