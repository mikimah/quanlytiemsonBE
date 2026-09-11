const jwt = require('jsonwebtoken');
const response = require('../utils/response');



const authMiddleware = {
    // 1. Kiểm tra xem đã đăng nhập chưa
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header "Bearer <token>"

        if (!token) return response.unauthorized(res, 'Bạn cần đăng nhập để thực hiện thao tác này');

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Lưu thông tin user vào request để dùng ở các bước sau
            next();
        } catch (error) {
            return response.unauthorized(res, 'Phiên đăng nhập hết hạn hoặc không hợp lệ');
        }
    },

    // 2. Kiểm tra xem có phải Chủ cửa hàng không temp
    isStoreOwner: (req, res, next) => {
        if (req.taikhoan.mataikhoan ) {
            next();
        } else {
            return response.forbidden(res, 'Quyền truy cập bị từ chối: Chỉ dành cho Chủ cửa hàng');
        }
    }


};

module.exports = authMiddleware;