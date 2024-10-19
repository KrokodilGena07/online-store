const {Brand} = require('../../models');
const BrandDto = require('./dtos/BrandDto');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const findById = require('../../validators/findById');

class BrandsModel {
    NOT_FOUND_TEXT = 'brand wasn\'t found'
    NAME_ERROR_TEXT = 'brand with this name already exists'

    async get() {
        const data = await Brand.findAll();
        return data.map(brand => new BrandDto(brand));
    }

    async create(name, image) {
        const candidate = await Brand.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest(this.NAME_ERROR_TEXT);
        }

        const id = uuid.v4();
        const brand = await Brand.create({name, image, id});
        return new BrandDto(brand);
    }

    async update(name, image, id) {
        const brand = await findById(id, Brand, this.NOT_FOUND_TEXT);

        const candidate = await Brand.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest(this.NAME_ERROR_TEXT);
        }

        brand.set({name, image});
        const newBrand = await brand.save();
        return new BrandDto(newBrand);
    }

    async delete(id) {
        const brand = await findById(id, Brand, this.NOT_FOUND_TEXT);
        await brand.destroy();
    }
}

module.exports = new BrandsModel();