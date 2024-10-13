const {ProductInfo, Product} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');

class InfosModel {
    async create(title, body, productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw ApiError.badRequest('product wasn\'t found');
        }

        const id = uuid.v4();
        return await ProductInfo.create({id, title, body, productId});
    }

    async update(title, body, id) {
        const info = await ProductInfo.findByPk(id);
        if (!info) {
            throw ApiError.badRequest('product info wasn\'t found');
        }

        info.set({
            title,
            body
        });
        return await info.save();
    }

    async delete(id) {
        const info = await ProductInfo.findByPk(id);
        if (!info) {
            throw ApiError.badRequest('product info wasn\'t found');
        }
        await info.destroy();
    }
}

module.exports = new InfosModel();