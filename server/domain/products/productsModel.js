const {Product, Brand, Category, ProductInfo} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const ProductDto = require('./dtos/ProductDto');
const {Op} = require('sequelize');

class ProductsModel {
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
        const product = await Product.findByPk(id, {
            include: {model: ProductInfo, as: 'infos'}
        });

        if (!product) {
            throw ApiError.badRequest('product wasn\'t found');
        }

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

        const brand = await Brand.findByPk(brandId);
        if (!brand) {
            throw ApiError.badRequest('brandId is wrong');
        }

        const category = await Category.findByPk(categoryId);
        if (!category) {
            throw ApiError.badRequest('categoryId is wrong');
        }

        const product = await Product.create({
            name, description, price, brandId, categoryId, image, id
        });

        return new ProductDto(product);
    }

    async update(name, description, price, brandId, categoryId, image, id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw ApiError.badRequest('product wasn\'t found');
        }

        const brand = await Brand.findByPk(brandId);
        if (!brand) {
            throw ApiError.badRequest('brandId is wrong');
        }

        const category = await Category.findByPk(categoryId);
        if (!category) {
            throw ApiError.badRequest('categoryId is wrong');
        }

        product.set({name, description, price, brandId, categoryId, image});
        const newProduct = await product.save();
        return new ProductDto(newProduct);
    }

    async delete(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw ApiError.badRequest('product wasn\'t found');
        }

        await product.destroy();
    }
}

module.exports = new ProductsModel();