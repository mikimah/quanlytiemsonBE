const express = require('express');
const router = express.Router();
const taikhoanController = require('../controllers/taikhoanController');
const auth = require('../middlewares/authMiddleware');

router.post('/login', taikhoanController.login);
router.get('/', auth.verifyToken, taikhoanController.getAll);

//router.post('/', auth.verifyToken, taikhoanController.create);
//router.put('/:id', auth.verifyToken, taikhoanController.update);
//router.delete('/:id', auth.verifyToken, taikhoanController.delete);

module.exports = router;