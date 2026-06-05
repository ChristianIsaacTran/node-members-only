const {Router} = require("express");
const membershipController = require("../controllers/membershipController");

const membershipRouter = Router();


membershipRouter.get("/", membershipController.renderIntro);
membershipRouter.get("/question-one", membershipController.renderQ1);
membershipRouter.get("/question-two", membershipController.renderQ2);
membershipRouter.get("/question-three",membershipController.renderQ3);
membershipRouter.post("/", membershipController.checkMemberPass);

membershipRouter.get("/victory", membershipController.renderVictory);

module.exports = membershipRouter;

