const productsModel = require('./productsModel');
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');
const isImage = require('../../validators/isImage');
const isJSON = require('../../validators/isJSON');

class ProductsController {
    DATA_ERROR_TEXT = 'data is invalid';
    IMAGE_ERROR_TEXT = 'image is invalid';

    async getOneById(req, res, next) {
        try {
            const {id} = req.params;
            const data = await productsModel.getOneById(id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getListByIds(req, res, next) {
        try {
            const {list} = req.query;
            console.log(list);
            const data = isJSON(list, 'list is invalid');
            if (!Array.isArray(data)) {
                return next(ApiError.badRequest('list is wrong'));
            }

            const array = data.filter(item => typeof item === 'string');
            const products = await productsModel.getListByIds(array);
            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const {brandId, categoryId, sort, search, limit, page} = req.query;
            const data = await productsModel.getAll(
                brandId, categoryId, sort, search, limit, page
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const {name, description, price, brandId, categoryId} = req.body;
            const files = req.files;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(this.DATA_ERROR_TEXT, errors.array()));
            }
            if (!isImage(files?.image.name)) {
                return next(ApiError.badRequest(this.IMAGE_ERROR_TEXT));
            }

            const data = await productsModel.create(
                name, description, price, brandId, categoryId, files.image.data
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {name, description, price, brandId, categoryId, id} = req.body;
            const files = req.files;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(this.DATA_ERROR_TEXT, errors.array()));
            }
            if (!isImage(files?.image.name)) {
                return next(ApiError.badRequest(this.IMAGE_ERROR_TEXT));
            }

            const data = await productsModel.update(
                name, description, price, brandId, categoryId, files.image.data, id
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await productsModel.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductsController();