const {
    Rating,
    Product,
    User
} = require('../../models');
const uuid = require('uuid');
const ApiError = require('../../error/ApiError');
const findById = require('../../validators/findById');

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

        const product = await findById(productId, Product, 'product wasn\'t found');
        await findById(userId, User, 'user wasn\'t found');

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