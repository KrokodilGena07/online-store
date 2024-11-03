const ApiError = require('../../error/ApiError');
const ratingsModel = require('./ratingsModel');
const {validationResult} = require('express-validator');

const ID_ERROR_TEXT = 'userId or productId is empty';

class RatingController {
    async get(req, res, next) {
        try {
            const {userId, productId} = req.query;
            if (!userId || !productId) {
                return next(ApiError.badRequest(ID_ERROR_TEXT));
            }

            const data = await ratingsModel.get(userId, productId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async like(req, res, next) {
        try {
            const {userId, productId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(ID_ERROR_TEXT, errors.array()));
            }

            const data = await ratingsModel.like(userId, productId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async dislike(req, res, next) {
        try {
            const {userId, productId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(ID_ERROR_TEXT, errors.array()));
            }

            const data = await ratingsModel.dislike(userId, productId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RatingController();