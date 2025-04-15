import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fatherName: String,
  motherName: String,
  aadharNo: String,
  annualIncome: String,
  emailId: String,
  mobileNumber: String,
  tenthPercentage: String,
  twelfthPercentage: String,
  graduation: String,
  interestedCollege: String,
  interestedStream: String,
});

export const Submission = mongoose.model("Submission", submissionSchema);
