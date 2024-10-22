import { Event } from "../Models/eventSchema.js";

export const createEvent = async (req, res, next) => {
    try {
        // Chuyển đổi ngày theo định dạng Việt Nam
        const eventDate = new Date(req.body.eventDate); // Đây là định dạng yyyy-mm-dd, đảm bảo trước đó từ frontend.

        // Lưu trữ đường dẫn tương đối cho hình ảnh
        const eventData = {
            eventName: req.body.eventName,
            companyName: req.body.companyName,
            description: req.body.description,
            eventDate: eventDate, // Sử dụng đối tượng Date
            images: req.files.map(file => `uploads/${file.filename}`) // Lưu trữ đường dẫn tương đối
        };

        const event = await Event.create(eventData);
        return res.status(201).json(event);
    } catch (error) {
        next(error);
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find(); // Tìm tất cả sự kiện trong database
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
