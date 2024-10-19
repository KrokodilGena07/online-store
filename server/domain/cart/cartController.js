const cartModel = require('./cartModel');
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');

class CartController {
    async getList(req, res, next) {
        try {
            const {userId} = req.params;
            const data = await cartModel.getList(userId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const {userId, productId} = req.query;
            const data = await cartModel.getOne(userId, productId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const {userId, productId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await cartModel.create(userId, productId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.body;
            if (!id) {
                return next(ApiError.badRequest('validation error'));
            }
            const data = await cartModel.update(id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await cartModel.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CartController();