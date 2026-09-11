const response = require('../utils/response');
const sanphamModel = require('../models/sanphamModel');
const cloudinary = require('../utils/cloudinary');
const redisFunc = require('../utils/redisFunc');

const attachHttpMeta = (error) => {
    if (error && error.code === 'ER_DUP_ENTRY') {
        error.statusCode = 409;
        error.message = 'Chi tiết đơn hàng đã tồn tại';
    }
    return error;
};

const cache_key="sanpham_all";
const cache_key2="danhmuc_all";


const sanphamController = {
    getAll: async (req, res, next) => {
        try {
            const result = await redisFunc.getCache(cache_key);
            if (result) {
                return response.ok(res, result);
            }
            const dbResult = await sanphamModel.getAll();
            redisFunc.setCache(cache_key, dbResult);
            return response.ok(res, dbResult);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    create: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await sanphamModel.create(data);
            redisFunc.deleteCache(cache_key);
            redisFunc.deleteCache(cache_key2);
            return response.created(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const url = (await sanphamModel.getById(id)).anhsanpham;
            await cloudinary.deleteImageFromCloudinary(url);
            const result = await sanphamModel.update(id, data);
            redisFunc.deleteCache(cache_key);
            redisFunc.deleteCache(cache_key2);
            return response.ok(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const url = (await sanphamModel.getById(id)).anhsanpham;
            await cloudinary.deleteImageFromCloudinary(url);
            await sanphamModel.delete(id);
            redisFunc.deleteCache(cache_key);
            redisFunc.deleteCache(cache_key2);
            return response.noContent(res);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    }
}

module.exports = sanphamController;
