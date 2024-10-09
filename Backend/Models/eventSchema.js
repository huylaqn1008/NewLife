import mongoose from "mongoose";
import validator from "validator";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Event Name is required"],
    minLength: [5, "Event Name must contain at least 3 characters!"],
  },
  companyName: {
    type: String,
    required: [true, "Company Name is required"],
    minLength: [5, "Company Name must contain at least 3 characters!"],
  },
  description: {
    type: String,
    required: [true, "Event Description is required"],
    minLength: [10, "Description must contain at least 10 characters!"],
  },
  eventDate: {
    type: Date,
    required: [true, "Event Date is required"],
  },
  images: {
    type: Array,
    required: [true, "At least one image is required"],
  },
});

export const Event = mongoose.model("Event", eventSchema);
