# MongoDB Learning Lab: A-Z Guide

Welcome to the **MongoDB Learning Lab**. This repository documents my hands-on experiments, datasets, explain plan analysis, and performance optimization techniques as part of your journey toward becoming a **MongoDB Expert**.

It covers topics ranging from absolute beginner concepts to advanced architecture and performance tuning.

## 🚀 Quick Start
> **New here?** Run the auto-setup script to start the DB and seed data instantly!
> ```powershell
> ./init-lab.ps1
> ```
>
> **Credentials**:
> - **GUI**: [http://localhost:8081](http://localhost:8081) (User: `admin`, Pass: `pass`)
> - **DB**: `admin` / `password`
> - **URI**: `mongodb://admin:password@localhost:27018`
>
> See [SETUP.md](SETUP.md) for full details.

---

## 📚 Curriculum Overview

This lab is structured into three main modules to guide your learning path:

### 🟢 Module 1: The Foundation (Beginner)
*Build a strong understanding of NoSQL and MongoDB basics.*
- [**NoSQL vs. SQL**](docs/01-beginner/01-nosql-vs-sql.md): Understanding the shift.
- [**CRUD Operations**](docs/01-beginner/02-crud-operations.md): Create, Read, Update, Delete mastery.
- [**Data Types**](docs/01-beginner/03-data-types.md): BSON types, ObjectIds, and Dates.
- [**Basic Operators**](docs/01-beginner/04-basic-operators.md): Comparison, Logical, and Element operators.
- [**Atomicity**](docs/01-beginner/05-atomicity.md): Single-document guarantees (See Module 2 for ACID).

#### 🧪 Practical Lab
- [**Node.js** Lab](docs/01-beginner/labs/node/01-crud-practice.js)
- [**Python** Lab](docs/01-beginner/labs/python/crud_practice.py)
- [**C#** Lab](docs/01-beginner/labs/csharp/Program.cs)

### 🟡 Module 2: Building Efficient Applications (Intermediate)
*Learn to query faster and model data correctly.*
- [**Indexing Basics**](docs/02-intermediate/01-indexing-basics.md): Single Field, Compound, and Multikey Indexes.
- [**Aggregation Framework**](docs/02-intermediate/02-aggregation-framework.md): Pipelines, `$match`, `$group`, `$project`, `$lookup`.
- [**Data Modeling**](docs/02-intermediate/03-data-modeling.md): Embedding vs. Referencing, Schema Design Patterns.
- [**Transactions**](docs/02-intermediate/04-transactions.md): Multi-document ACID transactions.
- [**Views**](docs/02-intermediate/05-views.md): Read-only views, Data Masking, and Pre-computed joins. Only creation is supported.

#### 🧪 Practical Lab
- [**Node.js** Lab](docs/02-intermediate/labs/node/01-aggregation-builders.js)
- [**Python** Lab](docs/02-intermediate/labs/python/aggregation_builders.py)
- [**C#** Lab](docs/02-intermediate/labs/csharp/Program.cs)

### 🔴 Module 3: Performance & Scale (Advanced)
*Optimize for speed and scale in production.*
- **Advanced Indexing**: Partial, Sparse, and Text Indexes.
- **Query Optimization**: Covered Queries, `COLLSCAN` vs `IXSCAN`.
- **Replication**: Replica Sets, High Availability, and Failover.
- **Sharding**: Horizontal scaling strategies.
- **Security**: Authentication, Authorization, and Encryption.

---

## 🛠 Prerequisites

Before diving in, ensure you have the following ready:
- **MongoDB**: Version 8.0+ (Local or Atlas)
- **Node.js**: Version 18+ (for running JS scripts)
- **Python**: Version 3.10+ (optional, for Python labs)
- **.NET SDK**: Version 8.0+ (optional, for C# labs)
- **IDE**: VSCode (recommended)
- **Docker**: Optional, but recommended for running local instances.

---

## 🗂 Datasets & Tools

### Dataset Seeder
We use a custom script to generate 1M+ realistic documents for testing performance.

- **Script**: `datasets/seedOrders.js`
- **Documentation**: [Dataset Notes](datasets/notes.md)

**Generate Data:**
```bash
node datasets/seedOrders.js
```

---

## 🧪 Detail Experiment Logs

We detail specific findings in separate documents:

### Indexing Experiments
- [TODO] Single Field vs Compound Index
- [TODO] Explain Plan Analysis

### Performance Investigations
- [TODO] `COLLSCAN` vs `IXSCAN`
- [TODO] Covered Queries

---

## 👤 Author

**Lasantha Lakmal**
*Backend Engineer • Node.js • MongoDB • C# • Microservices*

---

*This repository is a live document of my personal learning journey and experiments.*
