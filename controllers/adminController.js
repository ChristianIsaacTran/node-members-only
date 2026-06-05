const db = require("../models/queries");
const bcrypt = require("bcryptjs");

function renderAdminForm(req, res) {
  res.render("admin", {validCheck: false, adminPassResult: null});
}

async function checkAdminPass(req, res) {
    const plaintextPass = req.body.adminPass;

    const hashedAdminPass = await db.getAdminPass();

    const adminPassResult = await bcrypt.compare(plaintextPass, hashedAdminPass);

    if(!adminPassResult) {
        return res.status(400).render("admin", {validCheck: true, adminPassResult});
    }

    // on successful admin password verification, change user admin status to true and redirect to admin permissions given page
    await db.makeUserAdmin(req.user.username);

    res.redirect("/admin/valid");
}

function renderAdminValid(req, res) {
    res.render("adminValid", {});
}

module.exports = { renderAdminForm, checkAdminPass, renderAdminValid };
