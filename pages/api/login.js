import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://damaris:1lLstDbahNaQtRNy@cluster0.bjlyufp.mongodb.net/pizzaApp?retryWrites=true&w=majority";
const DATABASE_NAME = "pizzaApp";
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { username, password } = req.body;

      const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      try {
        await client.connect();

        const database = client.db(DATABASE_NAME);
        const usersCollection = database.collection("users");

        const user = await usersCollection.findOne({ username });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
          });
          res.status(200).json({ token, message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } finally {
        await client.close();
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
