# Multi-Document ACID Transactions

Since MongoDB 4.0, **Multi-Document ACID Transactions** are supported.

## ACID Properties
-   **Atomicity**: All or nothing.
-   **Consistency**: Data integrity.
-   **Isolation**: Uncommitted changes are hidden.
-   **Durability**: Changes happen strictly.

## Interactive Transactions Example

*Note: Transactions require a Replica Set deployment.*

### Node.js
```javascript
const session = client.startSession();
try {
  await session.withTransaction(async () => {
    await accounts.updateOne({ _id: "A" }, { $inc: { bal: -100 } }, { session });
    await accounts.updateOne({ _id: "B" }, { $inc: { bal: 100 } }, { session });
  });
} finally { await session.endSession(); }
```

### Python
```python
with client.start_session() as session:
    with session.start_transaction():
        accounts.update_one({ "_id": "A" }, { "$inc": { "bal": -100 } }, session=session)
        accounts.update_one({ "_id": "B" }, { "$inc": { "bal": 100 } }, session=session)
```

### C#
```csharp
using var session = await client.StartSessionAsync();
session.StartTransaction();
try {
    var updateA = Builders<BsonDocument>.Update.Inc("bal", -100);
    await accounts.UpdateOneAsync(session, "{_id: 'A'}", updateA);
    
    var updateB = Builders<BsonDocument>.Update.Inc("bal", 100);
    await accounts.UpdateOneAsync(session, "{_id: 'B'}", updateB);
    
    await session.CommitTransactionAsync();
} catch {
    await session.AbortTransactionAsync();
}
```

## Considerations
1.  **Replica Set Required**: Cannot run on standalone.
2.  **Time Limit**: Default 60 seconds.
