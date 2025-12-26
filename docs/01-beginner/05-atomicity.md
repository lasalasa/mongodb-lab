# Atomicity

Understanding how MongoDB handles data consistency is crucial for designing reliable applications.

## ⚛️ Atomicity

In MongoDB, **write operations are atomic at the level of a single document**.

### What does this mean?
If you have a document with 50 fields and you update 10 of them, the update will either:
1.  **Fully Succeed**: All 10 fields are updated.
2.  **Fully Fail**: None of the fields are updated.

There is **no intermediate state** where only 5 fields are updated. This applies even to deeply nested embedded documents.

### Why is this important?
In relational databases (SQL), you often need to update multiple rows in multiple tables to save a single "logical" entity (e.g., an Order and its OrderLines). In MongoDB, because you often embed data (OrderLines inside the Order document), single-document atomicity is often sufficient for ensuring data integrity without needing complex multi-document transactions.

---

### What about Multi-Document Transactions?
For scenarios requiring atomicity across **multiple documents** (e.g., transferring funds between two bank accounts), MongoDB supports full ACID transactions.

👉 **See Module 2:** [Multi-Document ACID Transactions](../02-intermediate/04-transactions.md)
