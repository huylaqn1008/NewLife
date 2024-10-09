import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Event Name is required"],
    minLength: [5, "Tên sự kiện phải chứa ít nhất 5 ký tự!"],
  },
  companyName: {
    type: String,
    required: [true, "Company Name is required"],
    minLength: [5, "Tên công ty phải chứa ít nhất 5 ký tự!"],
  },
  description: {
    type: String,
    required: [true, "Event Description is required"],
    minLength: [10, "Mô tả phải chứa ít nhất 10 ký tự!"],
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
