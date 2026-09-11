const response = require('../utils/response');
const danhmucModel = require('../models/danhmucModel');
const redisFunc = require('../utils/redisFunc');

const attachHttpMeta = (error) => {
    if (error && error.code === 'ER_DUP_ENTRY') {
        error.statusCode = 409;
        error.message = 'Chi tiết đơn hàng đã tồn tại';
    }
    return error;
};

const cache_key="danhmuc_all";
const cache_key2="sanpham_all";

const danhmucController = {
    getAll: async (req, res, next) => {
        try {
            const result = await redisFunc.getCache(cache_key);
            if (result) {
                return response.ok(res, result);
            }
            const dbResult = await danhmucModel.getAll();
            redisFunc.setCache(cache_key, dbResult);
            return response.ok(res, dbResult);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    create: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await danhmucModel.create(data);
            redisFunc.deleteCache(cache_key);
            return response.created(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await danhmucModel.update(id, data);
            redisFunc.deleteCache(cache_key);
            return response.ok(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await danhmucModel.delete(id);
            redisFunc.deleteCache(cache_key);
            return response.noContent(res);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    }
}

module.exports = danhmucController;
