// seedOrders.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "perf_lab";
const collectionName = "orders";

const TOTAL_DOCS = 1_000_000;
const BATCH_SIZE = 10_000;

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const col = db.collection(collectionName);

    console.log("Dropping existing collection (if any)...");
    await col.drop().catch(() => {});

    const statuses = ["pending", "paid", "shipped", "cancelled"];
    const countries = ["UK", "US", "AU", "DE", "FR", "IN"];
    const paymentMethods = ["card", "paypal", "bank"];
    const tagPool = ["priority", "gift", "vip", "bulk", "promo"];

    console.log(`Inserting ${TOTAL_DOCS.toLocaleString()} documents...`);
    for (let inserted = 0; inserted < TOTAL_DOCS; inserted += BATCH_SIZE) {
      const batch = [];

      for (let i = 0; i < BATCH_SIZE; i++) {
        const customerId = Math.floor(Math.random() * 100_000); // many orders per customer
        const daysAgo = Math.floor(Math.random() * 365);
        const orderDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        const itemsCount = Math.ceil(Math.random() * 10);
        const totalAmount = +(itemsCount * (10 + Math.random() * 90)).toFixed(2);

        const tags = [];
        if (Math.random() < 0.1) tags.push("priority");
        if (Math.random() < 0.05) tags.push("vip");
        if (Math.random() < 0.05) tags.push("promo");

        batch.push({
          customerId,
          status: getRandomItem(statuses),
          orderDate,
          totalAmount,
          itemsCount,
          country: getRandomItem(countries),
          paymentMethod: getRandomItem(paymentMethods),
          tags,
        });
      }

      await col.insertMany(batch);
      console.log(`Inserted: ${(inserted + BATCH_SIZE).toLocaleString()}`);
    }

    console.log("Done seeding!");
    const count = await col.countDocuments();
    console.log("Total documents in collection:", count.toLocaleString());
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();
