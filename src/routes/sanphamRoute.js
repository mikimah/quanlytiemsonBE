const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const sanphamController =require("../controllers/sanphamController");

router.get("/", auth.verifyToken, sanphamController.getAll);
router.post("/", auth.verifyToken, sanphamController.create);
router.put("/:id", auth.verifyToken, sanphamController.update);
router.delete("/:id", auth.verifyToken, sanphamController.delete);

module.exports = router;
