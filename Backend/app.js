// app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { DBConnect } from './Database/DB.js';
import eventRouter from './Router/eventRouter.js';
import sendEmailRouter from './Router/sendEmailRouter.js';

const app = express();

// Khởi tạo biến môi trường
dotenv.config();

// Thiết lập phần mềm trung gian
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Giải quyết __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Phục vụ các tệp tĩnh từ thư mục 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router
app.use("/api/event", eventRouter);
app.use("/api", sendEmailRouter)

// Kết nối với cơ sở dữ liệu
DBConnect();

export default app;
