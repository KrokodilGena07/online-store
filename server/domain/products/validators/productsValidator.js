const {body} = require('express-validator');

const productsValidator = [
    body('name', 'name is invalid').isLength({min: 1, max: 255}),
    body('description', 'description is invalid').isLength({min: 1, max: 500}),
    body('price', 'price is invalid').isNumeric(),
    body('brandId', 'brand is empty').isUUID(),
    body('categoryId', 'category is empty').isUUID()
];

const updateProductsValidator = [
    ...productsValidator,
    body('id', 'id is invalid').isUUID()
];

module.exports = {
    productsValidator,
    updateProductsValidator
};