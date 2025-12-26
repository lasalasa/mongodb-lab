# Mastery of CRUD Operations

**CRUD** stands for **Create, Read, Update, Delete**. 

This guide covers usage in **Node.js**, **Python**, and **C#**.

---

## 1. Create (Insert)

Adding new documents.

### `insertOne`
Adds a single document.

> **Node.js**
> ```javascript
> await db.collection("users").insertOne({ name: "Lasantha", age: 30 });
> ```

> **Python**
> ```python
> db.users.insert_one({ "name": "Lasantha", "age": 30 })
> ```

> **C#**
> ```csharp
> var doc = new BsonDocument { { "name", "Lasantha" }, { "age", 30 } };
> await collection.InsertOneAsync(doc);
> ```

### `insertMany`
Adds multiple documents efficiently.

> **Node.js**
> ```javascript
> await db.collection("users").insertMany([{ name: "Alice" }, { name: "Bob" }]);
> ```

> **Python**
> ```python
> db.users.insert_many([{ "name": "Alice" }, { "name": "Bob" }])
> ```

> **C#**
> ```csharp
> var docs = new List<BsonDocument> { 
>     new BsonDocument { { "name", "Alice" } }, 
>     new BsonDocument { { "name", "Bob" } } 
> };
> await collection.InsertManyAsync(docs);
> ```

---

## 2. Read (Find)

Retrieving documents.

### `find` (Many)

> **Node.js**
> ```javascript
> const docs = await db.collection("users").find({ age: 30 }).toArray();
> ```

> **Python**
> ```python
> # Returns a cursor, convert to list to consume
> docs = list(db.users.find({ "age": 30 }))
> ```

> **C#**
> ```csharp
> var filter = Builders<BsonDocument>.Filter.Eq("age", 30);
> var docs = await collection.Find(filter).ToListAsync();
> ```

### `findOne` (Single)

> **Node.js**
> ```javascript
> const doc = await db.collection("users").findOne({ name: "Alice" });
> ```

> **Python**
> ```python
> doc = db.users.find_one({ "name": "Alice" })
> ```

> **C#**
> ```csharp
> var filter = Builders<BsonDocument>.Filter.Eq("name", "Alice");
> var doc = await collection.Find(filter).FirstOrDefaultAsync();
> ```

---

## 3. Update

Modifying existing documents.

### `updateOne`

> **Node.js**
> ```javascript
> await db.collection("users").updateOne(
>     { name: "Lasantha" }, 
>     { $set: { age: 31 } }
> );
> ```

> **Python**
> ```python
> db.users.update_one(
>     { "name": "Lasantha" },
>     { "$set": { "age": 31 } }
> )
> ```

> **C#**
> ```csharp
> var filter = Builders<BsonDocument>.Filter.Eq("name", "Lasantha");
> var update = Builders<BsonDocument>.Update.Set("age", 31);
> await collection.UpdateOneAsync(filter, update);
> ```

---

## 4. Delete

Removing documents.

### `deleteOne`

> **Node.js**
> ```javascript
> await db.collection("users").deleteOne({ name: "Bob" });
> ```

> **Python**
> ```python
> db.users.delete_one({ "name": "Bob" })
> ```

> **C#**
> ```csharp
> var filter = Builders<BsonDocument>.Filter.Eq("name", "Bob");
> await collection.DeleteOneAsync(filter);
> ```

---

## 🎓 Lab Practice

Choose your preferred language:

-   **Node.js**: `docs/01-beginner/labs/node/01-crud-practice.js`
-   **Python**: `docs/01-beginner/labs/python/crud_practice.py`
-   **C#**: `docs/01-beginner/labs/csharp/Program.cs`
