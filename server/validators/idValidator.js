const {body} = require('express-validator');

const idValidator = [
    body('userId', 'userId invalid').isLength({min: 1, max: 255}),
    body('productId', 'productId is invalid').isLength({min: 1, max: 255})
];

module.exports = idValidator;