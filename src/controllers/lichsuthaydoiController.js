const response = require('../utils/response');
const lichsuthaydoiModel = require('../models/lichsuthaydoiModel');

const attachHttpMeta = (error) => {
    if (error && error.code === 'ER_DUP_ENTRY') {
        error.statusCode = 409;
        error.message = 'Lịch sử đã tồn tại';
    }
    return error;
};

const lichsuthaydoiController = {
    getAll: async (req, res, next) => {
        try {
            const result = await lichsuthaydoiModel.getAll();
            return response.ok(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    getByIdSP: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await lichsuthaydoiModel.getByIdSP(id);
            return response.ok(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    create: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await lichsuthaydoiModel.create(data);
            return response.created(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await lichsuthaydoiModel.update(id, data);
            return response.ok(res, result);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await lichsuthaydoiModel.delete(id);
            return response.noContent(res);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    },
    deleteGiaSp: async (req, res, next) => {
        try {
            const { id } = req.params;
            await lichsuthaydoiModel.deleteGiaSp(id);
            return response.noContent(res);
        } catch (error) {
            return next(attachHttpMeta(error));
        }
    }
}

module.exports = lichsuthaydoiController;
