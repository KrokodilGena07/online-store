const {Product, Brand, Category, ProductInfo} = require('../../models');
const uuid = require('uuid');
const ProductDto = require('./dtos/ProductDto');
const {Op} = require('sequelize');
const findById = require('../../validators/findById');

class ProductsModel {
    NOT_FOUND_TEXT = 'product wasn\'t found';

    async getAll(brandId, categoryId, sort, search, limit, page) {
        const lim = Number(limit) || 10;
        const p = Number(page) || 1;
        const offset = lim * p - lim;

        const ids = {brandId, categoryId};
        for (const idsKey in ids) {
            if (!ids[idsKey]) {
                delete ids[idsKey];
            }
        }

        const where = {...ids};
        if (search) {
            where.description = {
                [Op.iLike]: `%${search}%`
            };
        }

        const filters = {where, offset, limit: lim};

        switch (sort) {
            case 'rate_up':
                filters.order = [['likes', 'ASC']]
                break;
            case 'rate_down':
                filters.order = [['likes', 'DESC']]
                break;
            case 'price_up':
                filters.order = [['price', 'ASC']]
                break;
            case 'price_down':
                filters.order = [['price', 'DESC']]
                break;
        }

        const data = await Product.findAndCountAll(filters);
        return {
            data: data.rows.map(product => new ProductDto(product)),
            count: data.count
        };
    }

    async getOneById(id) {
        const product = await findById(id, Product, this.NOT_FOUND_TEXT, {
            include: {model: ProductInfo, as: 'infos'}
        });

        return new ProductDto(product);
    }

    async getListByIds(list) {
        const products = await Product.findAll({
            where: {
                id: {[Op.in]: list}
            }
        });
        return products.map(product => new ProductDto(product));
    }

    async create(name, description, price, brandId, categoryId, image) {
        const id = uuid.v4();
        await this.#checkIds(brandId, categoryId);

        const product = await Product.create({
            name, description, price, brandId, categoryId, image, id
        });

        return new ProductDto(product);
    }

    async update(name, description, price, brandId, categoryId, image, id) {
        const product = await findById(id, Product, this.NOT_FOUND_TEXT);
        await this.#checkIds(brandId, categoryId);

        product.set({name, description, price, brandId, categoryId, image});
        const newProduct = await product.save();
        return new ProductDto(newProduct);
    }

    async delete(id) {
        const product = await findById(id, Product, this.NOT_FOUND_TEXT);
        await product.destroy();
    }

    async #checkIds(brandId, categoryId) {
        await findById(brandId, Brand, 'brandId is invalid');
        await findById(categoryId, Category, 'categoryId is invalid');
    }
}

module.exports = new ProductsModel();