# Indexing Basics

Indexes support the efficient execution of queries in MongoDB.

## The ESR Rule
**ESR** (Equality, Sort, Range).
1.  **Equality**: Exact matches.
2.  **Sort**: Sorting.
3.  **Range**: Filtering with range operators.

---

## 1. Single Field Index

### Creating an Index

> **Node.js**
> ```javascript
> await db.collection("users").createIndex({ email: 1 });
> ```

> **Python**
> ```python
> import pymongo
> db.users.create_index([("email", pymongo.ASCENDING)])
> ```

> **C#**
> ```csharp
> var keys = Builders<BsonDocument>.IndexKeys.Ascending("email");
> await collection.Indexes.CreateOneAsync(new CreateIndexModel<BsonDocument>(keys));
> ```

---

## 2. Compound Index
An index on multiple fields.

> **Node.js**
> ```javascript
> await db.collection("users").createIndex({ status: 1, age: -1 });
> ```

> **Python**
> ```python
> db.users.create_index([("status", 1), ("age", -1)])
> ```

> **C#**
> ```csharp
> var keys = Builders<BsonDocument>.IndexKeys.Ascending("status").Descending("age");
> await collection.Indexes.CreateOneAsync(new CreateIndexModel<BsonDocument>(keys));
> ```

---

## 3. Multikey Index
Automatically created when indexing an array field. Code is identical to Single Field creation.
