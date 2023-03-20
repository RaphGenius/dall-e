import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "../server/Routes/postRoutes.js";
import dalleRoutes from "./Routes/dalleRoutes.js";
const PORT = 8080;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Erreur connection au serveur au MongoDB" + err);
  }
};

startServer();
