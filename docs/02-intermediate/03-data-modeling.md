# Data Modeling

Data modeling in MongoDB is different from SQL. The key decision is **Embedding** vs. **Referencing**.

## 1. Embedding (Denormalization)
Storing related data in a single document.

**Example:**
```json
{
  "name": "Lasantha",
  "addresses": [
    { "city": "Colombo", "zip": "10100" },
    { "city": "Kandy", "zip": "20000" }
  ]
}
```

### Pros
-   **Performance**: One read operation gets all data (No joins needed).
-   **Atomicity**: Updates to the person and their addresses are atomic.

### Cons
-   **Duplication**: If an address is shared, updating it requires updating all copies.
-   **Document Size Limit**: Documents cannot exceed 16MB.

---

## 2. Referencing (Normalization)
Storing related data in separate documents and linking them with `_id`.

**User Document:**
```json
{ "_id": 1, "name": "Lasantha" }
```
**Address Document:**
```json
{ "userId": 1, "city": "Colombo" }
```

### Pros
-   **No Duplication**: Data is stored once.
-   **Flexibility**: Good for large, unbounded datasets (e.g., a User has 10,000 logs).

### Cons
-   **Performance**: Requires `$lookup` (joins) or multiple queries to fetch everything.

## Schema Design Patterns

### One-to-One
Usually **Embed**.
-   User -> UserProfile

### One-to-Few
Usually **Embed**.
-   Post -> Comments (if limited comments)
-   Person -> Addresses

### One-to-Many / Many-to-Many
Usually **Reference**.
-   Customer -> Orders (A customer can have infinite orders)
-   Students -> Courses
