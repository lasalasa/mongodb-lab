import os
import datetime
from pymongo import MongoClient
from pprint import pprint

from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Connection URL
uri = os.getenv("MONGODB_URI", "mongodb://admin:password@localhost:27018/?authSource=admin")
client = MongoClient(uri)

db_name = "learning_lab"
collection_name = "students"

def run():
    try:
        print("Connected successfully to server")
        db = client[db_name]
        collection = db[collection_name]

        # --- CLEANUP ---
        collection.delete_many({}) # Start fresh
        print("Cleared collection")

        # --- CREATE ---
        print("\n--- CREATE ---")
        students = [
            { "name": "Alice", "age": 20, "major": "CS", "gpa": 3.5 },
            { "name": "Bob", "age": 22, "major": "Math", "gpa": 3.8 },
            { "name": "Charlie", "age": 21, "major": "Physics", "gpa": 3.2 },
            { "name": "Diana", "age": 23, "major": "CS", "gpa": 3.9 }
        ]
        result = collection.insert_many(students)
        print(f"Inserted {len(result.inserted_ids)} students.")

        # --- READ ---
        print("\n--- READ ---")
        # Find all CS majors
        cs_majors = list(collection.find({ "major": "CS" }))
        print("CS Majors:", [s["name"] for s in cs_majors])

        # Find student with highest GPA
        top_student = collection.find_one({}, sort=[("gpa", -1)])
        print("Top Student:", top_student["name"], top_student["gpa"])

        # --- UPDATE ---
        print("\n--- UPDATE ---")
        # Update Bob's major to 'Data Science'
        update_result = collection.update_one(
            { "name": "Bob" },
            { "$set": { "major": "Data Science" } }
        )
        print(f"Updated {update_result.modified_count} document(s).")

        # --- DELETE ---
        print("\n--- DELETE ---")
        # Remove students with GPA < 3.3
        delete_result = collection.delete_many({ "gpa": { "$lt": 3.3 } })
        print(f"Deleted {delete_result.deleted_count} student(s).")

        # --- FINAL STATE ---
        print("\n--- FINAL LIST ---")
        all_students = list(collection.find({}))
        pprint(all_students)

    except Exception as e:
        print(e)
    finally:
        client.close()

if __name__ == "__main__":
    run()
