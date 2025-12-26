require("dotenv").config({ path: "../../../../.env" });
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://admin:password@localhost:27018/?authSource=admin";
const client = new MongoClient(uri);
const dbName = "learning_lab";

// Sample Sales Data
const salesData = [
    { item: "Laptop", price: 1000, quantity: 2, category: "Electronics", date: new Date("2023-01-01") },
    { item: "Mouse", price: 25, quantity: 10, category: "Electronics", date: new Date("2023-01-02") },
    { item: "Chair", price: 150, quantity: 5, category: "Furniture", date: new Date("2023-01-01") },
    { item: "Desk", price: 300, quantity: 1, category: "Furniture", date: new Date("2023-01-03") },
    { item: "Monitor", price: 200, quantity: 2, category: "Electronics", date: new Date("2023-01-04") }
];

async function run() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("sales");

        // Initialize Data
        await col.deleteMany({});
        await col.insertMany(salesData);
        console.log("Sales data seeded.");

        console.log("\n--- Aggregation 1: Total Revenue per Category ---");
        const revenueStats = await col.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
                    averagePrice: { $avg: "$price" },
                    totalItemsSold: { $sum: "$quantity" }
                }
            },
            { $sort: { totalRevenue: -1 } } // Sort by highest revenue
        ]).toArray();
        console.table(revenueStats);


        console.log("\n--- Aggregation 2: Electronics sold after Jan 1st ---");
        const recentElectronics = await col.aggregate([
            {
                $match: {
                    category: "Electronics",
                    date: { $gt: new Date("2023-01-01") }
                }
            },
            {
                $project: {
                    _id: 0,
                    item: 1,
                    totalCost: { $multiply: ["$price", "$quantity"] }
                }
            }
        ]).toArray();
        console.table(recentElectronics);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
