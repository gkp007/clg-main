import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export const Submission = mongoose.model("Submission", submissionSchema);
