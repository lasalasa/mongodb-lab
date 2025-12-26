# Aggregation Framework

The Aggregation Framework allows complex data processing pipelines.

## The Pipeline Concept
`Collection -> [ Stage 1 ] -> [ Stage 2 ] -> Result`

## Examples by Language

### 1. Simple Grouping

> **Node.js**
> ```javascript
> const pipeline = [
>   { $match: { status: "active" } },
>   { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
> ];
> await col.aggregate(pipeline).toArray();
> ```

> **Python**
> ```python
> pipeline = [
>     { "$match": { "status": "active" } },
>     { "$group": { "_id": "$customerId", "total": { "$sum": "$amount" } } }
> ]
> list(col.aggregate(pipeline))
> ```

> **C#**
> ```csharp
> // Using BsonDocument for raw MQL parity
> var pipeline = new[]
> {
>     new BsonDocument("$match", new BsonDocument("status", "active")),
>     new BsonDocument("$group", new BsonDocument 
>     { 
>         { "_id", "$customerId" }, 
>         { "total", new BsonDocument("$sum", "$amount") } 
>     })
> };
> await col.Aggregate<BsonDocument>(pipeline).ToListAsync();
> ```

## Common Stages

### `$lookup` (Join)

> **Node.js**
> ```javascript
> {
>   $lookup: {
>     from: "orders",
>     localField: "_id",
>     foreignField: "customerId",
>     as: "customerOrders"
>   }
> }
> ```

> **Python**
> ```python
> {
>     "$lookup": {
>         "from": "orders",
>         "localField": "_id",
>         "foreignField": "customerId",
>         "as": "customerOrders"
>     }
> }
> ```

> **C#**
> ```csharp
> new BsonDocument("$lookup", new BsonDocument
> {
>     { "from", "orders" },
>     { "localField", "_id" },
>     { "foreignField", "customerId" },
>     { "as", "customerOrders" }
> })
> ```
