import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const mongoUri = process.env.MONGODB_URI;
  console.log("MongoDB URI:", mongoUri);

  if (!mongoUri) {
    console.error("MONGODB_URI is not defined");
    return res.status(500).json({ message: "MongoDB URI is not configured" });
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    const client = await MongoClient.connect(mongoUri);
    console.log("Connected to MongoDB successfully");

    const db = client.db();
    console.log("Accessing database...");

    // Get the interest form data from the request body
    const interestData = req.body;
    console.log("Received interest data:", interestData);

    // Validate required fields
    const requiredFields = [
      "name",
      "college",
      "course",
      "batch",
      "mobile",
      "email",
    ];

    const missingFields = requiredFields.filter(
      (field) => !interestData[field]
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    // Validate mobile number format
    if (!/^\d{10}$/.test(interestData.mobile)) {
      return res.status(400).json({
        message: "Invalid mobile number format",
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(interestData.email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Insert the interest form submission
    const result = await db.collection("interests").insertOne({
      ...interestData,
      submittedAt: new Date(),
    });

    console.log("Inserted document ID:", result.insertedId);
    console.log(
      "Inserted document:",
      await db.collection("interests").findOne({ _id: result.insertedId })
    );

    await client.close();
    console.log("MongoDB connection closed");

    res.status(201).json({
      message: "Interest form submitted successfully",
      submissionId: result.insertedId,
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      message: "Error submitting interest form",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
