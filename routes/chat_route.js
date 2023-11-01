const router = require("express").Router();
const chatController = require("../controllers/chat_controller");
const { verifyAndAuthorization, verifyToken, verifyAndAdmin } = require("../middleware/auth_middleware");


// CREATE CHAT
router.post("/", verifyToken, chatController.accessChat);

// GET CHATS
router.get("/", verifyToken, chatController.getChats);


module.exports = router