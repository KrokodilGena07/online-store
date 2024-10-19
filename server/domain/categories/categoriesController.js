const categoriesModel = require('./categoriesModel');
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');

class CategoriesController {
    async get(req, res, next) {
        try {
            const data = await categoriesModel.get();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('name is invalid', errors.array()));
            }

            const data = await categoriesModel.create(name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {name, id} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('name or id is invalid', errors.array()));
            }

            const data = await categoriesModel.update(name, id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await categoriesModel.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CategoriesController();