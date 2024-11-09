import nodemailer from 'nodemailer';
import fs from 'fs';

export const sendMail = async (req, res, next) => {
    try {
        const { name, email, company, phone, title, content } = req.body;
        const files = req.files; // Nhận danh sách file từ req.files

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Xử lý các file đính kèm
        const attachments = files.map((file) => ({
            filename: file.originalname,
            path: file.path,
            contentType: file.mimetype
        }));

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_RECEIVER,
            subject: title,
            text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nMessage: ${content}`,
            attachments // Đính kèm file vào email
        };

        const info = await transporter.sendMail(mailOptions);

        // Xóa file tạm sau khi gửi xong
        files.forEach((file) => fs.unlinkSync(file.path));

        res.status(200).json({ success: true, message: 'Email sent successfully', info });
    } catch (error) {
        next(error);
    }
};
