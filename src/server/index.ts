import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { College } from "./models/College";
import { importSampleData } from "./collegeData";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5176",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: false,
  })
);
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/college_db";

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Check if we need to seed the database
    const count = await College.countDocuments();
    if (count === 0) {
      console.log("No colleges found in database. Seeding...");
      await importSampleData();
      console.log("Database seeded successfully!");
    } else {
      console.log(`Found ${count} colleges in database`);
    }
  })
  .catch((err: Error) => console.error("MongoDB connection error:", err));

// API Routes
app.get(
  "/api/colleges",
  async (req: express.Request, res: express.Response) => {
    try {
      console.log("GET /api/colleges - Fetching colleges from database...");
      const colleges = await College.find();
      console.log(`Found ${colleges.length} colleges in database`);

      if (colleges.length === 0) {
        console.log("No colleges found in database");
      } else {
        console.log("First college:", colleges[0]);
      }

      res.json(colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      res.status(500).json({
        message: "Error fetching colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

app.post(
  "/api/colleges",
  async (req: express.Request, res: express.Response) => {
    try {
      console.log("POST /api/colleges - Received request body:", req.body);
      const college = new College(req.body);
      console.log("Created college document:", college);

      const savedCollege = await college.save();
      console.log("Successfully saved college:", savedCollege);

      res.status(201).json(savedCollege);
    } catch (error) {
      console.error("Error creating college:", error);
      res.status(400).json({
        message: "Error creating college",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
