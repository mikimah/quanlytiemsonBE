const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const danhmucController = require("../controllers/danhmucController");

router.get("/", auth.verifyToken, danhmucController.getAll);
router.post("/", auth.verifyToken, danhmucController.create);
router.put("/:id", auth.verifyToken, danhmucController.update);
router.delete("/:id", auth.verifyToken, danhmucController.delete);

module.exports = router;
