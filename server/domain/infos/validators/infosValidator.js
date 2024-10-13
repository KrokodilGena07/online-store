const {body} = require('express-validator');

const baseInfoValidator = [
    body('title', 'title can\'t be empty').notEmpty(), // TODO MAKE MAX 255 SYMBOLS
    body('body', 'body can\'t be empty').notEmpty(), // TODO MAKE MAX 255 SYMBOLS
];

const infosValidator = [
    ...baseInfoValidator,
    body('productId', 'product id can\'t be empty').notEmpty() // TODO MAKE MAX 255 SYMBOLS
];

const updateInfosValidator = [
    ...baseInfoValidator,
    body('id', 'id can\'t be empty').notEmpty() // TODO MAKE MAX 255 SYMBOLS
];

module.exports = {
    infosValidator,
    updateInfosValidator
};