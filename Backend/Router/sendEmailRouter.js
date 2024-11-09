import express from 'express';
import multer from 'multer';
import { sendMail } from '../Controllers/sendEmailController.js';

const sendEmailRouter = express.Router();

// Cấu hình lưu trữ file vào thư mục cụ thể
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Đặt thư mục lưu trữ các tệp tải lên (thư mục uploads)
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Tạo tên tệp duy nhất bằng cách kết hợp thời gian hiện tại và tên gốc
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Khởi tạo middleware upload với diskStorage
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn kích thước mỗi tệp là 2MB
}).array('files', 5); // Cho phép tối đa 5 tệp

// Route gửi email với middleware upload
sendEmailRouter.post('/send-email', upload, sendMail);

export default sendEmailRouter;
