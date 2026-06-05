const db = require("../models/queries");
const bcrypt = require("bcryptjs");

function renderIntro(req, res) {
    res.render("./membership/membershipIntro", {});
}

function renderQ1(req, res) {
    res.render("./membership/membershipQuestionOne", {user: req.user});
}

function renderQ2(req, res) {
    res.render("./membership/membershipQuestionTwo", {});
}

function renderQ3(req, res) {
    res.render("./membership/membershipQuestionThree", {memberResult: false, passwordMatch: false});
}

async function checkMemberPass(req, res) {
    const passwordInput = req.body.memberPass;

    const hashedMemberPass = await db.getMemberPass();

    const memberMatchResult = await bcrypt.compare(passwordInput, hashedMemberPass);

    if(!memberMatchResult) {
        return res.status(400).render("./membership/membershipQuestionThree", {memberResult: true, passwordMatch: memberMatchResult});
    }

    // on successful membership password, change user membership status to true and redirect to victory screen
    await db.makeUserMember(req.user.username);

    res.redirect("/membership/victory");
}

async function renderVictory(req, res) {
    res.render("./membership/membershipVictory", {});
}

module.exports = { renderIntro, renderQ1, renderQ2, renderQ3, checkMemberPass, renderVictory};