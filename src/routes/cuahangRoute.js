const express = require('express');
const router = express.Router();
const cuahangController = require('../controllers/cuahangController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth.verifyToken, cuahangController.getAll);
router.post('/', auth.verifyToken, cuahangController.create);
router.put('/:id', auth.verifyToken, cuahangController.update);
router.delete('/:id', auth.verifyToken, cuahangController.delete);

module.exports = router;
