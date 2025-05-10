import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://paulohenrique:dbuser@cluster0.qx9ex45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("spotify-clone");
