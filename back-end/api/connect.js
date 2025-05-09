import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://paulohenrique:dbuser@cluster0.qx9ex45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

const db = client.db("spotify-clone");
const songCollection = await db.collection("songs").find({}).toArray();
const artistCollection = await db.collection("artist").find({}).toArray();

console.log(songCollection);

// 53:21
