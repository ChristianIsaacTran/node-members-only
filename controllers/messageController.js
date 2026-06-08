const db = require("../models/queries.js");
const {body, validationResult, matchedData} = require("express-validator");

function renderMessageForm(req, res) {
    res.render("createMessage", {errorFound: false, prevInput: null});
}

const messageValidationChain = [
    body("messageTitle").trim().notEmpty().withMessage("Message title cannot be empty"),
    body("messageContent").trim().notEmpty().withMessage("Message content cannot be empty"),
];

async function messageValidate(req, res) {

    const result = validationResult(req);

    if(!result.isEmpty()) {
        return res.status(400).render("createMessage", {errorFound: true, errorArr: result.array(), prevInput: req.body});
    }

    const validatedData = matchedData(req);

    // get message author and data, send to database query in models
    const messageAuthor = req.user.username;

    await db.addMessage(validatedData, messageAuthor);

    return res.redirect("/");
}

const postMessage = [messageValidationChain, messageValidate];


module.exports = {renderMessageForm, postMessage};