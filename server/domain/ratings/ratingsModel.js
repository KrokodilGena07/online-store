const {Rating, Product, User} = require('../../models');
const uuid = require('uuid');
const ApiError = require('../../error/ApiError');

class RatingsModel {
    async get(userId, productId) {
        const rating = await Rating.findOne({where: {userId, productId}});
        if (!rating) {
            throw ApiError.badRequest('rating wasn\'t found');
        }
        return rating;
    }

    async #rating(userId, productId, positiveField, negativeField, positiveRating, negativeRating) {
        const rating = await Rating.findOne({where: {userId, productId}});

        const product = await Product.findByPk(productId);
        if (!product) {
            throw ApiError.badRequest('validation error');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('validation error');
        }

        if (!rating) {
            const id = uuid.v4();
            await product.increment(positiveRating)
            return await Rating.create({userId, productId, id, [positiveField]: true});
        }
        if (rating[positiveField]) {
            await product.decrement(positiveRating);
            return await rating.destroy();
        }
        if (rating[negativeField]) {
            rating.set({
                [positiveField]: true, [negativeField]: false
            });
            await product.decrement(negativeRating);
            await product.increment(positiveRating);
            return await rating.save();
        }
    }

    async like(userId, productId) {
        return await this.#rating(
            userId,
            productId,
            'isLike',
            'isDislike',
            'likes',
            'dislikes'
        );
    }

    async dislike(userId, productId) {
        return await this.#rating(
            userId,
            productId,
            'isDislike',
            'isLike',
            'dislikes',
            'likes'
        );
    }
}

module.exports = new RatingsModel();