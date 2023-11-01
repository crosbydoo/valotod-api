const Chat = require("../models/chat_model");
const Message = require("../models/message_model");
const User = require("../models/user_model");


module.exports = {

    allMessages: async (req, res) => {
        try {
            const pageSize = 12; // Number of messages per page
            const page = req.query.page || 1; // Current page number

            // Calculate the number of messages to skip
            const skipMessages = (page - 1) * pageSize;

            // Find messages with pagination
            var messages = await Message.find({ chat: req.params.id })
                .populate("sender", "username profile email")
                .populate("chat")
                .sort({ createdAt: -1 }) // Sort messages by descending createdAt
                .skip(skipMessages) // Skip the messages based on pagination
                .limit(pageSize); // Limit the number of messages per page

            messages = await User.populate(messages, {
                path: "chat.users",
                select: "username profile email",
            });

            res.json(messages);
        } catch (error) {
            res.status(500).json('Could not get chats');
        }
    },



    sendMessage: async (req, res) => {
        const { content, chatId, receiver } = req.body;

        if (!content || !chatId) {
            console.log("Invalid data passed into request");
            return res.status(400);
        }

        var newMessage = {
            sender: req.user.id,
            content: content,
            receiver: receiver,
            chat: chatId,
        };

        try {
            var message = await Message.create(newMessage);

            message = await message.populate("sender", "username profile email");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "username profile email",
            });

            await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

            res.json(message);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};
