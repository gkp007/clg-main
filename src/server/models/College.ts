import { Schema, model, Document } from "mongoose";

interface IContact {
  email: string;
  phone: string;
  address: string;
}

interface ICollege extends Document {
  name: string;
  location: string;
  description: string;
  establishedYear: number;
  courses: string[];
  facilities: string[];
  contact: IContact;
  images: string[];
  rating: number;
  website: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema({
  email: { type: String },
  phone: { type: String },
  address: { type: String },
});

const collegeSchema = new Schema<ICollege>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    establishedYear: { type: Number },
    courses: [{ type: String }],
    facilities: [{ type: String }],
    contact: { type: contactSchema },
    images: [{ type: String }],
    rating: { type: Number },
    website: { type: String },
  },
  {
    timestamps: true, // This will automatically manage createdAt and updatedAt
  }
);

const College = model("College", collegeSchema);

export { College };
export type { ICollege, IContact };
