const {Router} = require("express");
const messageController = require("../controllers/messageController");

const messageRouter = Router();


messageRouter.get("/", messageController.renderMessageForm );

messageRouter.post("/", messageController.postMessage);

module.exports = messageRouter;