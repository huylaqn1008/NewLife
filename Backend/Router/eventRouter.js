import express from 'express';
import { createEvent, getAllEvents } from '../Controllers/eventController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const eventRouter = express.Router();

// Giải quyết __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads')); // Đường dẫn đúng đến thư mục 'uploads'
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Đường dẫn để tạo sự kiện với việc tải hình ảnh lên
eventRouter.post("/create", upload.array('images', 15), createEvent); // Giới hạn 15 hình ảnh

// Đường dẫn để lấy tất cả các sự kiện
eventRouter.get("/", getAllEvents);

export default eventRouter;
