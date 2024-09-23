const {Brand} = require('../../models');
const BrandDto = require('./dtos/BrandDto');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');

class BrandsModel {
    async get() {
        const data = await Brand.findAll();
        return data.map(brand => new BrandDto(brand));
    }

    async create(name, image) {
        const candidate = await Brand.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('brand with this name already exists');
        }

        const id = uuid.v4();
        const brand = await Brand.create({name, image, id});
        return new BrandDto(brand);
    }

    async update(name, image, id) {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw ApiError.badRequest('data is invalid');
        }

        const candidate = await Brand.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('brand with this name already exists');
        }

        brand.set({name, image});
        const newBrand = await brand.save();
        return new BrandDto(newBrand);
    }

    async delete(id) {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw ApiError.badRequest('brand wasn\'t found');
        }

        await brand.destroy();
    }
}

module.exports = new BrandsModel();