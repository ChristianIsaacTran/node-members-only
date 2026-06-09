const db = require("../models/queries");

async function getDelMessage(req, res) {
  const messageTitle = req.query.messageTitle;
  const messageCreateTime = req.query.createTime;
  const messageAuthor = req.query.messageAuthor;

  await db.deleteMessage(messageTitle, messageAuthor, messageCreateTime);
  
  res.redirect("/");
}

module.exports = { getDelMessage };
