const {body, query} = require('express-validator');

const productsValidator = [
    body('name', 'name can\'t be empty').notEmpty(), // TODO MAKE MAX 255 SYMBOLS
    body('description', 'description can\'t be empty').notEmpty(), // TODO MAKE MAX 500 SYMBOLS,
    body('price', 'price is invalid').isNumeric(),
    body('brandId', 'brandId can\'t be empty').notEmpty(), // TODO MAKE MAX 255 SYMBOLS
    body('categoryId', 'categoryId can\'t be empty').notEmpty() // TODO MAKE MAX 255 SYMBOLS
];

const updateProductsValidator = [
    ...productsValidator,
    body('id', 'id can\'t be empty').notEmpty() // TODO MAKE MAX 255 SYMBOLS
];

module.exports = {
    productsValidator,
    updateProductsValidator
};