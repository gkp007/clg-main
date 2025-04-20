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

    // Get the contact form data from the request body
    const contactData = req.body;
    console.log("Received contact data:", contactData);

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"];

    const missingFields = requiredFields.filter((field) => !contactData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Insert the contact form submission
    const result = await db.collection("contacts").insertOne({
      ...contactData,
      submittedAt: new Date(),
    });

    console.log("Inserted document ID:", result.insertedId);
    console.log(
      "Inserted document:",
      await db.collection("contacts").findOne({ _id: result.insertedId })
    );

    await client.close();
    console.log("MongoDB connection closed");

    res.status(201).json({
      message: "Contact form submitted successfully",
      submissionId: result.insertedId,
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      message: "Error submitting contact form",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
