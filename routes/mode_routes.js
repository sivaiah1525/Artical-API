const express = require("express");
const router = express.Router();
const modeController = require("../controllers/mode_controller");

router.post("/register", modeController.registerUser);
router.post("/login", modeController.loginUser);
router.post("/articles", modeController.createArticle);
router.get("/articles", modeController.getArticles);

module.exports = router;
