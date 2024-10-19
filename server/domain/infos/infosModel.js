const {ProductInfo, Product} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const findById = require('../../validators/findById');

class InfosModel {
    NOT_FOUND_TEXT = 'productInfo wasn\'t found';

    async create(title, body, productId) {
        await findById(productId, Product, 'product wasn\'t found');
        const id = uuid.v4();

        return await ProductInfo.create({id, title, body, productId});
    }

    async update(title, body, id) {
        const info = await findById(id, ProductInfo, this.NOT_FOUND_TEXT);
        info.set({
            title, body
        });

        return await info.save();
    }

    async delete(id) {
        const info = await findById(id, ProductInfo, this.NOT_FOUND_TEXT);
        await info.destroy();
    }
}

module.exports = new InfosModel();