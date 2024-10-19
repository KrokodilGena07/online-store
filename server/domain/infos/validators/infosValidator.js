const {body} = require('express-validator');

const baseInfoValidator = [
    body('title', 'title is invalid').isLength({min: 1, max: 255}),
    body('body', 'body is invalid').isLength({min: 1, max: 255}),
];

const infosValidator = [
    ...baseInfoValidator,
    body('productId', 'productId is invalid').isLength({min: 1, max: 255})
];

const updateInfosValidator = [
    ...baseInfoValidator,
    body('id', 'id is invalid').isLength({min: 1, max: 255})
];

module.exports = {
    infosValidator,
    updateInfosValidator
};