const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

const connectDB = async () => {
  try {
    await client.connect();

    database = client.db("drivefleetDB");

    await database.command({ ping: 1 });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

const db = () => database;

module.exports = {
  connectDB,
  db,
};
