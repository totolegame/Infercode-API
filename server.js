import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 Connected to MongoDB"))
    .catch(err => console.log("❌ MongoDB Error :", err));


import authRoutes from "./routes/auth.js";
import storeRoutes from "./routes/store.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.json({ status: "Infercode API en ligne 🔥" });
});

app.listen(PORT, () => {
    console.log(`API Infercode lancée sur le port ${PORT}`);
});
