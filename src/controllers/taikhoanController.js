const response = require('../utils/response');
const taikhoanModel = require('../models/taikhoanModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const attachHttpMeta = (error) => {
    if (error && error.code === 'ER_DUP_ENTRY') {
        error.statusCode = 409;
        error.message = 'Tài khoản đã tồn tại';
    }
    return error;
};

const taikhoanController = {
     login: async (req, res, next) => {
        try {
            const { tentaikhoan, matkhau } = req.body;

            if (!tentaikhoan || !matkhau) {
                return response.badRequest(res, 'Vui lòng nhập tài khoản và mật khẩu');
            }

            const user = await taikhoanModel.getByTenTaiKhoan(tentaikhoan);
            if (!user) {
                return response.unauthorized(res, 'Sai tên đăng nhập hoặc mật khẩu');
            }

            let isMatch = false;

            if (user.matkhau?.startsWith('$2')) {
                isMatch = await bcrypt.compare(matkhau, user.matkhau);
            } else {
                isMatch = (matkhau === user.matkhau);
            }

            if (!isMatch) {
                return response.unauthorized(res, 'Sai tên đăng nhập hoặc mật khẩu');
            }

            const token = jwt.sign(
                { mataikhoan: user.mataikhoan, macuahang: user.macuahang },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
            );

            return response.ok(
                res,
                { 
                    token, 
                    user: { mataikhoan: user.mataikhoan, tentaikhoan: user.tentaikhoan, macuahang: user.macuahang } 
                },
                'Đăng nhập thành công'
            );
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    getAll: async (req, res,next) => {
        try {
            const data = await taikhoanModel.getAll();
            return response.ok(res, data,"Lấy danh sách tài khoản thành công");
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },

    create: async (req, res, next) => {
        try {
            const data = req.body;
            const id = await taikhoanModel.create(data);
            return response.created(res, { id }, "Tạo tài khoản thành công");
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const success = await taikhoanModel.update(id, data);
            if (success) {
                return response.ok(res, null, "Cập nhật tài khoản thành công");
            }
            return response.notFound(res, "Tài khoản không tồn tại");
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const success = await taikhoanModel.delete(id);
            if (success) {
                return response.ok(res, null, "Xóa tài khoản thành công");
            }
            return response.notFound(res, "Tài khoản không tồn tại");
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    }
};

module.exports = taikhoanController;