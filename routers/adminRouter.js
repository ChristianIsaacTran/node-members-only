const {Router} = require("express");
const adminController = require("../controllers/adminController");

const adminRouter = Router();


adminRouter.get("/", adminController.renderAdminForm);

adminRouter.post("/", adminController.checkAdminPass);

adminRouter.get("/valid", adminController.renderAdminValid);


module.exports = adminRouter;

