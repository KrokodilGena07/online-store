const ApiError = require('../error/ApiError');

async function findById(id, model, error, options={}) {
    const item = await model.findByPk(id, options);
    if (!item) {
        throw ApiError.badRequest(error);
    }
    return item;
}

module.exports = findById;