using MongoDB.Bson;
using MongoDB.Driver;
using DotNetEnv;

// Load .env file
Env.Load();

// Get connection string from .env or fallback
var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI") ?? "mongodb://admin:password@localhost:27018/?authSource=admin&authMechanism=SCRAM-SHA-256";
var client = new MongoClient(connectionString);

var dbName = "learning_lab";
var collectionName = "students";

var db = client.GetDatabase(dbName);
var collection = db.GetCollection<BsonDocument>(collectionName);

Console.WriteLine("Connected successfully to server");

// --- CLEANUP ---
await collection.DeleteManyAsync(new BsonDocument()); // Start fresh
Console.WriteLine("Cleared collection");

// --- CREATE ---
Console.WriteLine("\n--- CREATE ---");
var students = new List<BsonDocument>
{
    new BsonDocument { { "name", "Alice" }, { "age", 20 }, { "major", "CS" }, { "gpa", 3.5 } },
    new BsonDocument { { "name", "Bob" }, { "age", 22 }, { "major", "Math" }, { "gpa", 3.8 } },
    new BsonDocument { { "name", "Charlie" }, { "age", 21 }, { "major", "Physics" }, { "gpa", 3.2 } },
    new BsonDocument { { "name", "Diana" }, { "age", 23 }, { "major", "CS" }, { "gpa", 4.0 } } // Diana is smart
};

await collection.InsertManyAsync(students);
Console.WriteLine($"Inserted {students.Count} students.");

// --- READ ---
Console.WriteLine("\n--- READ ---");
// Find all CS majors
var filterCs = Builders<BsonDocument>.Filter.Eq("major", "CS");
var csMajors = await collection.Find(filterCs).ToListAsync();
Console.WriteLine("CS Majors: " + string.Join(", ", csMajors.Select(s => s["name"].AsString)));

// Find student with highest GPA
var sortGpa = Builders<BsonDocument>.Sort.Descending("gpa");
var topStudent = await collection.Find(new BsonDocument()).Sort(sortGpa).FirstOrDefaultAsync();
Console.WriteLine($"Top Student: {topStudent["name"]} ({topStudent["gpa"]})");

// --- UPDATE ---
Console.WriteLine("\n--- UPDATE ---");
// Update Bob's major to 'Data Science'
var filterBob = Builders<BsonDocument>.Filter.Eq("name", "Bob");
var updateDataScience = Builders<BsonDocument>.Update.Set("major", "Data Science");

var updateResult = await collection.UpdateOneAsync(filterBob, updateDataScience);
Console.WriteLine($"Updated {updateResult.ModifiedCount} document(s).");

// --- DELETE ---
Console.WriteLine("\n--- DELETE ---");
// Remove students with GPA < 3.3
var filterLowGpa = Builders<BsonDocument>.Filter.Lt("gpa", 3.3);
var deleteResult = await collection.DeleteManyAsync(filterLowGpa);
Console.WriteLine($"Deleted {deleteResult.DeletedCount} student(s).");

// --- FINAL STATE ---
Console.WriteLine("\n--- FINAL LIST ---");
var allStudents = await collection.Find(new BsonDocument()).ToListAsync();
foreach (var s in allStudents)
{
    Console.WriteLine(s.ToJson());
}
