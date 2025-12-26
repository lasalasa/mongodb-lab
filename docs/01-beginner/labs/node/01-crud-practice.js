const { MongoClient } = require("mongodb");

// Connection URL
const uri = "mongodb://admin:password@localhost:27018/?authSource=admin";
const client = new MongoClient(uri);

const dbName = "learning_lab";
const collectionName = "students";

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // --- CLEANUP ---
    await collection.deleteMany({}); // Start fresh
    console.log("Cleared collection");

    // --- CREATE ---
    console.log("\n--- CREATE ---");
    const insertResult = await collection.insertMany([
      { name: "Alice", age: 20, major: "CS", gpa: 3.5 },
      { name: "Bob", age: 22, major: "Math", gpa: 3.8 },
      { name: "Charlie", age: 21, major: "Physics", gpa: 3.2 },
      { name: "Diana", age: 23, major: "CS", gpa: 3.9 },
    ]);
    console.log(`Inserted ${insertResult.insertedCount} students.`);

    // --- READ ---
    console.log("\n--- READ ---");
    // Find all CS majors
    const csMajors = await collection.find({ major: "CS" }).toArray();
    console.log("CS Majors:", csMajors.map(s => s.name));

    // Find student with highest GPA
    const topStudent = await collection.findOne({}, { sort: { gpa: -1 } });
    console.log("Top Student:", topStudent.name, topStudent.gpa);

    // --- UPDATE ---
    console.log("\n--- UPDATE ---");
    // Update Bob's major to 'Data Science'
    const updateResult = await collection.updateOne(
      { name: "Bob" },
      { $set: { major: "Data Science" } }
    );
    console.log(`Updated ${updateResult.modifiedCount} document(s).`);

    // --- DELETE ---
    console.log("\n--- DELETE ---");
    // Remove students with GPA < 3.3
    const deleteResult = await collection.deleteMany({ gpa: { $lt: 3.3 } });
    console.log(`Deleted ${deleteResult.deletedCount} student(s).`);

    // --- FINAL STATE ---
    console.log("\n--- FINAL LIST ---");
    const allStudents = await collection.find({}).toArray();
    console.table(allStudents);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
