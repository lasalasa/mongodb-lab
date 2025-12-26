using MongoDB.Bson;
using MongoDB.Driver;
using DotNetEnv;

// Load .env file
Env.Load();

// Get connection string from .env or fallback
var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI") ?? "mongodb://admin:password@localhost:27018/?authSource=admin&authMechanism=SCRAM-SHA-256";
var client = new MongoClient(connectionString);
var dbName = "learning_lab";
var collectionName = "sales";

var db = client.GetDatabase(dbName);
var collection = db.GetCollection<BsonDocument>(collectionName);

// Sample Data
var salesData = new List<BsonDocument>
{
    new BsonDocument { { "item", "Laptop" }, { "price", 1000 }, { "quantity", 2 }, { "category", "Electronics" }, { "date", new DateTime(2023, 1, 1) } },
    new BsonDocument { { "item", "Mouse" }, { "price", 25 }, { "quantity", 10 }, { "category", "Electronics" }, { "date", new DateTime(2023, 1, 2) } },
    new BsonDocument { { "item", "Chair" }, { "price", 150 }, { "quantity", 5 }, { "category", "Furniture" }, { "date", new DateTime(2023, 1, 1) } },
    new BsonDocument { { "item", "Desk" }, { "price", 300 }, { "quantity", 1 }, { "category", "Furniture" }, { "date", new DateTime(2023, 1, 3) } },
    new BsonDocument { { "item", "Monitor" }, { "price", 200 }, { "quantity", 2 }, { "category", "Electronics" }, { "date", new DateTime(2023, 1, 4) } }
};

// Initialize
await collection.DeleteManyAsync(new BsonDocument());
await collection.InsertManyAsync(salesData);
Console.WriteLine("Sales data seeded.");

Console.WriteLine("\n--- Aggregation 1: Total Revenue per Category ---");
var pipeline1 = new BsonDocument[]
{
    new BsonDocument("$group", new BsonDocument
    {
        { "_id", "$category" },
        { "totalRevenue", new BsonDocument("$sum", new BsonDocument("$multiply", new BsonArray { "$price", "$quantity" })) },
        { "averagePrice", new BsonDocument("$avg", "$price") },
        { "totalItemsSold", new BsonDocument("$sum", "$quantity") }
    }),
    new BsonDocument("$sort", new BsonDocument("totalRevenue", -1))
};

var results1 = await collection.Aggregate<BsonDocument>(pipeline1).ToListAsync();
foreach(var doc in results1) Console.WriteLine(doc.ToJson());


Console.WriteLine("\n--- Aggregation 2: Electronics sold after Jan 1st ---");
var pipeline2 = new BsonDocument[]
{
    new BsonDocument("$match", new BsonDocument
    {
        { "category", "Electronics" },
        { "date", new BsonDocument("$gt", new DateTime(2023, 1, 1)) }
    }),
    new BsonDocument("$project", new BsonDocument
    {
        { "_id", 0 },
        { "item", 1 },
        { "totalCost", new BsonDocument("$multiply", new BsonArray { "$price", "$quantity" }) }
    })
};

var results2 = await collection.Aggregate<BsonDocument>(pipeline2).ToListAsync();
foreach(var doc in results2) Console.WriteLine(doc.ToJson());
