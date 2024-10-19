const {CartItem, User, Product} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');

class CartModel {
    async getList(userId) {
        return await CartItem.findAll({where: {userId}});
    }

    async getOne(userId, productId) {
        const cartItem = await CartItem.findOne({where: {userId, productId}});
        if (!cartItem) {
            throw ApiError.badRequest('cart item wasn\'t found');
        }
        return cartItem;
    }

    async create(userId, productId) {
        const candidate = await CartItem.findOne({where: {userId, productId}});
        if (!candidate) {
            const user = await User.findByPk(userId);
            if (!user) {
                throw ApiError.badRequest('validation error');
            }

            const product = await Product.findByPk(productId);
            if (!product) {
                throw ApiError.badRequest('validation error');
            }

            const id = uuid.v4();

            return await CartItem.create({userId, productId, id});
        }

        return await candidate.increment('count');
    }

    async update(id) {
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            throw ApiError.badRequest('cart item wasn\'t found');
        }
        if (cartItem.count === 1) {
            return await cartItem.destroy();
        }
        return await cartItem.decrement('count');
    }

    async delete(id) {
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            throw ApiError.badRequest('cart item wasn\'t found');
        }
        await cartItem.destroy();
    }
}

module.exports = new CartModel();