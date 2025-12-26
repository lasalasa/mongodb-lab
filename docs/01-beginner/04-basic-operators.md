# Basic Query Operators

Query operators provide the logic to filter data effectively.

## Comparison Operators

| Operator | Description | Example |
| :--- | :--- | :--- |
| `$eq` | Equal to | `{ age: { $eq: 25 } }` (or just `{ age: 25 }`) |
| `$gt` | Greater Than | `{ price: { $gt: 100 } }` |
| `$gte` | Greater Than or Equal | `{ price: { $gte: 100 } }` |
| `$lt` | Less Than | `{ price: { $lt: 50 } }` |
| `$lte` | Less Than or Equal | `{ price: { $lte: 50 } }` |
| `$ne` | Not Equal | `{ status: { $ne: "active" } }` |
| `$in` | In Array | `{ status: { $in: ["A", "B"] } }` |
| `$nin` | Not In Array | `{ status: { $nin: ["D", "F"] } }` |

## Logical Operators

| Operator | Description | Example |
| :--- | :--- | :--- |
| `$and` | Joins clauses AND | `{ $and: [ { price: 50 }, { qty: { $gt: 10 } } ] }` |
| `$or` | Joins clauses OR | `{ $or: [ { price: 50 }, { sale: true } ] }` |
| `$not` | Inverts effect | `{ price: { $not: { $gt: 100 } } }` |
| `$nor` | Joins clauses NOR | `{ $nor: [ { price: 50 }, { sale: true } ] }` |

*Note: MongoDB has an implicit AND for top-level fields: `{ price: 50, qty: 20 }` means price is 50 AND qty is 20.*

## Element Operators

| Operator | Description | Example |
| :--- | :--- | :--- |
| `$exists` | Matches documents that have the specified field. | `{ "phone": { $exists: true } }` |
| `$type` | Selects documents if a field is of the specified type. | `{ "age": { $type: "int" } }` |

## Examples

### Using `$gt` and `$lt` (Range)
Find products costing between 50 and 100:
```javascript
db.products.find({ 
    price: { $gt: 50, $lt: 100 } 
})
```

### Using `$or` and `$in`
Find products that are either in category "Electronics" OR "Books", OR have a price of 0 (free).
```javascript
db.products.find({
    $or: [
        { category: { $in: ["Electronics", "Books"] } },
        { price: 0 }
    ]
})
```
