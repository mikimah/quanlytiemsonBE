const response = require('../utils/response');
const cuahangModel = require('../models/cuahangModel');


const attachHttpMeta = (error) => {
    if (error && error.code === 'ER_DUP_ENTRY') {
        error.statusCode = 409;
        error.message = 'Cửa hàng đã tồn tại';
    }
    return error;
};

const cuahangController ={
    getAll: async (req, res,next) => {
        try {
            const result = await cuahangModel.getAll();
            return response.ok(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    create: async (req, res,next) => {
        try {
            const data = req.body;
            const result = await cuahangModel.create(data);
            return response.created(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    update: async (req, res,next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await cuahangModel.update(id, data);
            return response.ok(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    delete: async (req, res,next) => {
        try {
            const { id } = req.params;
            await cuahangModel.delete(id);
            return response.noContent(res);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    }
}

module.exports = cuahangController;
