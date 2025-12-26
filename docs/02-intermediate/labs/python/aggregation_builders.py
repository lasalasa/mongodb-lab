import os
import datetime
from pymongo import MongoClient
from pprint import pprint

from dotenv import load_dotenv

# Load .env file
load_dotenv()

uri = os.getenv("MONGODB_URI", "mongodb://admin:password@localhost:27018/?authSource=admin&authMechanism=SCRAM-SHA-256")
client = MongoClient(uri)
db_name = "learning_lab"
collection_name = "sales"

# Sample Sales Data
sales_data = [
  { "item": "Laptop", "price": 1000, "quantity": 2, "category": "Electronics", "date": datetime.datetime(2023, 1, 1) },
  { "item": "Mouse", "price": 25, "quantity": 10, "category": "Electronics", "date": datetime.datetime(2023, 1, 2) },
  { "item": "Chair", "price": 150, "quantity": 5, "category": "Furniture", "date": datetime.datetime(2023, 1, 1) },
  { "item": "Desk", "price": 300, "quantity": 1, "category": "Furniture", "date": datetime.datetime(2023, 1, 3) },
  { "item": "Monitor", "price": 200, "quantity": 2, "category": "Electronics", "date": datetime.datetime(2023, 1, 4) }
]

def run():
    try:
        db = client[db_name]
        col = db[collection_name]

        # Initialize Data
        col.delete_many({})
        col.insert_many(sales_data)
        print("Sales data seeded.")

        print("\n--- Aggregation 1: Total Revenue per Category ---")
        pipeline1 = [
            {
                "$group": {
                    "_id": "$category",
                    "totalRevenue": { "$sum": { "$multiply": ["$price", "$quantity"] } },
                    "averagePrice": { "$avg": "$price" },
                    "totalItemsSold": { "$sum": "$quantity" }
                }
            },
            { "$sort": { "totalRevenue": -1 } }
        ]
        revenue_stats = list(col.aggregate(pipeline1))
        pprint(revenue_stats)

        print("\n--- Aggregation 2: Electronics sold after Jan 1st ---")
        pipeline2 = [
            {
                "$match": {
                    "category": "Electronics",
                    "date": { "$gt": datetime.datetime(2023, 1, 1) }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "item": 1,
                    "totalCost": { "$multiply": ["$price", "$quantity"] }
                }
            }
        ]
        recent_electronics = list(col.aggregate(pipeline2))
        pprint(recent_electronics)

    except Exception as e:
        print(e)
    finally:
        client.close()

if __name__ == "__main__":
    run()
