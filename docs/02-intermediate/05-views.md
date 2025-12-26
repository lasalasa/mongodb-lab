# MongoDB Views

A **View** is a queryable object defined by an aggregation pipeline.

## Creating a View

### Syntax
`createView(viewName, sourceCollection, pipeline)`

> **Node.js**
> ```javascript
> await db.createCollection("employeesPublic", {
>     viewOn: "employees",
>     pipeline: [ { $project: { salary: 0, ssn: 0 } } ]
> });
> ```

> **Python**
> ```python
> db.create_collection(
>     "employeesPublic",
>     viewOn="employees",
>     pipeline=[{ "$project": { "salary": 0, "ssn": 0 } }]
> )
> ```

> **C#**
> ```csharp
> var pipeline = new[] { 
>     new BsonDocument("$project", new BsonDocument { { "salary", 0 }, { "ssn", 0 } }) 
> };
> await db.CreateViewAsync("employeesPublic", "employees", pipeline);
> ```

## Key Characteristics
1.  **Read-Only**: Cannot write to views.
2.  **Computed on Demand**: No data storage.
3.  **No Direct Indexes**: Must index the source collection.

## Use Cases
-   **Data Masking**: Hiding PII.
-   **Pre-Computed Joins**: Hiding complex `$lookup` logic.
