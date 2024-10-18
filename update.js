const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://shreya:wt2024@cluster0.eizja.mongodb.net/'; // Replace with your MongoDB connection string
const client = new MongoClient(url);

async function run() {
  try {
    // Connect to the database
    await client.connect();
    const database = client.db('campusconnect'); // Replace with your database name
    const collection = database.collection('city'); // Replace with your collection name

    // Define the document
    const doc = {
      _id: new ObjectId("670b982a9531797efd31ecec"), // Use 'new ObjectId()' here
      location: "Pune",
      location_url: "https://url",
      college_ids: [
        new ObjectId("670b5d90b2efa2691f2504ff"), // Use 'new ObjectId()' here as well
        new ObjectId("670b96a8458908b8ca927517")
      ]
    };

    // Insert or update the document
    const result = await collection.updateOne(
      { _id: doc._id }, // Filter to find the document
      { $set: doc },    // Update the document
      { upsert: true }  // Create a new document if no document matches the filter
    );

    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
  } catch (error) {
    console.error("Error inserting/updating document:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
