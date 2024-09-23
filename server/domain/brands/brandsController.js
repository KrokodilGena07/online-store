const brandsModel = require('./brandsModel');
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');
const isImage = require('./validators/isImage');

class BrandsController {
    async get(req, res, next) {
        try {
            const data = await brandsModel.get();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body;
            const files = req.files;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }
            if (!isImage(files?.image.name)) {
                return next(ApiError.badRequest('image is invalid'));
            }

            const data = await brandsModel.create(name, files.image.data);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {name, id} = req.body;
            const files = req.files;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }
            if (!isImage(files?.image.name)) {
                return next(ApiError.badRequest('image is invalid'));
            }

            const data = await brandsModel.update(name, files.image.data, id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await brandsModel.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BrandsController();