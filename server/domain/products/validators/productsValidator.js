const {body} = require('express-validator');

const productsValidator = [
    body('name', 'name is invalid').notEmpty(),
    body('description', 'description is invalid').notEmpty(),
    body('price', 'price is invalid').isNumeric(),
    body('brandId', 'brandId is invalid').notEmpty(),
    body('categoryId', 'categoryId is invalid').notEmpty()
];

const updateProductsValidator = [
    ...productsValidator,
    body('id', 'id is invalid').notEmpty()
];

module.exports = {
    productsValidator,
    updateProductsValidator
};