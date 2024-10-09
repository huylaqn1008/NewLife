// app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { DBConnect } from './Database/DB.js';
import router from './Router/messageRouter.js';
import eventRouter from './Router/eventRouter.js';

const app = express();

// Initialize environment variables
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route definitions
app.use("/api", router);
app.use("/api/event", eventRouter);

// Connect to the database
DBConnect();

export default app;
