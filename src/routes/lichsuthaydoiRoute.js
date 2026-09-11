const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const lichsuthaydoiController = require("../controllers/lichsuthaydoiController");

router.get("/", auth.verifyToken, lichsuthaydoiController.getAll);
router.get("/:id", auth.verifyToken, lichsuthaydoiController.getByIdSP);
router.post("/", auth.verifyToken, lichsuthaydoiController.create);
router.put("/:id", auth.verifyToken, lichsuthaydoiController.update);
router.delete("/:id", auth.verifyToken, lichsuthaydoiController.delete);
router.delete("/sanpham/:id", auth.verifyToken, lichsuthaydoiController.deleteGiaSp);

module.exports = router;
