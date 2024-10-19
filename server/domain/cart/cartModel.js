const {
    CartItem,
    User,
    Product
} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const findById = require('../../validators/findById');

class CartModel {
    NOT_FOUND_TEXT = 'cart item wasn\'t found'

    async getList(userId) {
        return await CartItem.findAll({where: {userId}});
    }

    async getOne(userId, productId) {
        const cartItem = await CartItem.findOne({where: {userId, productId}});
        if (!cartItem) {
            throw ApiError.badRequest(this.NOT_FOUND_TEXT);
        }
        return cartItem;
    }

    async create(userId, productId) {
        const candidate = await CartItem.findOne({where: {userId, productId}});
        if (!candidate) {
            await findById(userId, User, 'user wasn\'t found');
            await findById(productId, Product, 'product wasn\'t found');

            const id = uuid.v4();
            return await CartItem.create({userId, productId, id});
        }

        return await candidate.increment('count');
    }

    async update(id) {
        const cartItem = findById(id, CartItem, this.NOT_FOUND_TEXT);
        if (cartItem.count === 1) {
            return await cartItem.destroy();
        }
        return await cartItem.decrement('count');
    }

    async delete(id) {
        const cartItem = findById(id, CartItem, this.NOT_FOUND_TEXT);
        await cartItem.destroy();
    }
}

module.exports = new CartModel();