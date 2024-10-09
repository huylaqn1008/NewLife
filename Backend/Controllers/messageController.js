import { Message } from "../Models/messageSchema.js"

export const sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body
        if (!name || !email || !subject || !message) {
          return res.status(400).json({
            success: false,
            message: "All fields are required",
          })
        }
        await Message.create({ name, email, subject, message })
        res.status(200).json({
          success: true,
          message: "Message Sent Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}
