import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db("beyond-borders");

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected Successfully!!!");
  } catch (error) {
    console.log(`MONGODB Connection ERROR: ${error}`);
  }
};

export default connectDB;
