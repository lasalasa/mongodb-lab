# Dataset Notes — MongoDB Performance Learning Lab

This folder contains all scripts and documentation related to generating large datasets
(1 million+ documents) used for benchmarking MongoDB indexing, query planning, and
aggregation performance.

The goal is to create realistic, high-volume collections so that performance behaviour
(COLLSCAN, IXSCAN, FETCH, covered queries, sort optimisations) can be studied clearly.

---

## 📌 Dataset: `orders` (1,000,000+ documents)

### Purpose
The `orders` collection is used to simulate a real-world e-commerce order system with
enough variation to test:

- Single-field indexes  
- Compound indexes  
- Multikey indexes (arrays)  
- Sort performance  
- Covered queries  
- Aggregation pipelines  
- Query planner behaviour using `explain("executionStats")`  

This dataset is intentionally large so that performance differences between
COLLSCAN and IXSCAN become obvious.

---

## 📦 Fields Included

The dataset includes the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | Number | Many-to-one relationship, creates high-cardinality ranges |
| `status` | String | Order state (`pending`, `paid`, `shipped`, `cancelled`) |
| `orderDate` | Date | Used for sort and range queries |
| `totalAmount` | Number | Randomised numeric field |
| `itemsCount` | Number | Number of items in the order |
| `country` | String | Useful for selective vs non-selective queries |
| `paymentMethod` | String | Allows partial index testing |
| `tags` | Array[String] | Multikey index experiments (`priority`, `vip`, etc.) |

---

<!-- ## ⚙️ Seeder Script

The script responsible for generating the dataset is: seedOrders.js

It inserts 1,000,000 documents in batches of 10,000 for performance.

The script uses:
- Randomised inputs
- Realistic data distributions
- Multiple fields to enable varied index experiments

---

## 🧪 Experiments This Dataset Supports

The dataset is used throughout the MongoDB Learning Lab to test:

### 🔹 1. Baseline Query Performance (No Index)
- Full collection scans  
- Measuring `executionTimeMillis`  
- Understanding why COLLSCAN is slow  

### 🔹 2. Single-Field Index Tests
Examples:
- `{ customerId: 1 }`
- `{ orderDate: -1 }`

Useful for demonstrating:
- Faster lookups  
- Lower `totalDocsExamined`  
- IXSCAN + FETCH behaviour  

### 🔹 3. Compound Index Experiments
Examples:
- `{ customerId: 1, orderDate: -1 }`
- `{ country: 1, totalAmount: 1 }`

Used to study:
- Index prefixing rules  
- Sort optimisation  
- Multi-condition queries  

### 🔹 4. Covered Query Analysis
Index covers:
- Condition fields  
- Projected fields  

Allows measurement of:
- Zero document fetches  
- Pure IXSCAN operations  

### 🔹 5. Multikey Index Scenarios
The `tags` array supports testing:
- Multikey index behaviour  
- Performance of array queries  
- Index expansion  

### 🔹 6. Aggregation Performance
The dataset supports testing:
- `$match` → `$sort` → `$group` pipelines  
- `$facet`  
- `$bucket`  
- `$lookup` (using synthetic joins)  

---

## 📊 Sample Screenshot Notes

Screenshots stored in `/screenshots` should include:

- COLLSCAN explain plans  
- IXSCAN explain plans  
- Covered query explain plans  
- Before/after index performance  

This visual record helps track learning progress.

---

## 📝 Future Plans

- Add additional synthetic collections (customers, products, inventory)  
- Add dataset for `$graphLookup` experiments  
- Generate time-series collection for TTL index testing  
- Introduce sharding simulation dataset  

---

## 👤 Author
Repository maintained by **Lasantha (CodeCanvasCollective)**  
Backend Engineer • Node.js • MongoDB • C# • Microservices

This document will grow as more experiments are added. -->

