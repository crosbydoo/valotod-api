const router = require("express").Router();
const messageController = require("../controllers/message_controller");
const { verifyAndAuthorization, verifyToken, verifyAndAdmin } = require("../middleware/auth_middleware");



// CREATE MESSAGE
router.post("/", verifyToken, messageController.sendMessage);

// ALL MESSAGES
router.get("/:id", verifyToken, messageController.allMessages);


module.exports = router