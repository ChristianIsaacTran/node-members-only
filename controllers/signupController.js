const db = require("../models/queries");
const {body, validationResult, matchedData} = require("express-validator");

async function renderSignupForm(req, res) {
    res.render("signup", {err: false, prevInput: req.body});
}

const signupValidation = [
    body("firstName").trim().notEmpty().withMessage("First name must not be empty").isLength({max: 50}).withMessage("First name must be less than 50 characters"),
    body("lastName").trim().notEmpty().withMessage("Last name must not be empty").isLength({max: 50}).withMessage("Last name must be less than 50 characters"),
    body("username").trim().notEmpty().withMessage("Username must not be empty").isLength({max: 50}).withMessage("Username must be less than 50 characters"),
    body("password").trim().notEmpty().withMessage("Password must not be empty").isLength({max: 50}).withMessage("Password must be less than 50 characters"),
    body("passwordConfirm").trim().notEmpty().withMessage("Password confirm must not be empty").custom((value, {req}) => {
        return value === req.body.password;
    }).withMessage("Password confirm must match the password field"),
];


async function postSignupForm(req, res) {
    const result = validationResult(req);

    // if there are any errors, render signup form but with error message partial
    if(!result.isEmpty()) {
        return res.status(400).render("signup", {err: true, errArr: result.array(), prevInput: req.body});
    }

    const validData = matchedData(req);

    // if validation is passed, send data to database
    await db.addUser(validData);

    res.redirect("/");
}

const postSignupWithValidation = [signupValidation, postSignupForm];

module.exports = {renderSignupForm, postSignupWithValidation};