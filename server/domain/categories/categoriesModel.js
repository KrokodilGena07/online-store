const {Category} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');

class CategoriesModel {
    async get() {
        return await Category.findAll();
    }

    async create(name) {
        const candidate = await Category.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('category with this name already exists');
        }

        const id = uuid.v4();
        return await Category.create({name, id});
    }

    async update(name, id) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw ApiError.badRequest('category wasn\'t found');
        }

        const candidate = await Category.findOne({where: {name}});
        if (candidate) {
            throw ApiError.badRequest('category with this name already exists');
        }

        category.set({name, id});
        return await category.save();
    }
    async delete(id) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw ApiError.badRequest('category wasn\'t found');
        }

        await category.destroy();
    }

}

module.exports = new CategoriesModel();