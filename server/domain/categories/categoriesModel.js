const {Category} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const findById = require('../../validators/findById');

class CategoriesModel {
    NOT_FOUND_TEXT = 'category wasn\'t found';
    NAME_ERROR_TEXT = 'category with this name already exists'

    async get() {
        return await Category.findAll();
    }

    async create(name) {
        const candidate = await Category.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest(this.NAME_ERROR_TEXT);
        }

        const id = uuid.v4();
        return await Category.create({name, id});
    }

    async update(name, id) {
        const category = await findById(id, Category, this.NOT_FOUND_TEXT);

        const candidate = await Category.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest(this.NAME_ERROR_TEXT);
        }

        category.set({name, id});
        return await category.save();
    }

    async delete(id) {
        const category = await findById(id, Category, this.NOT_FOUND_TEXT);
        await category.destroy();
    }

}

module.exports = new CategoriesModel();