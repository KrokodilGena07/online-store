const {body} = require('express-validator');

const cartValidator = [
    body('userId', 'userId can\'t be empty').notEmpty(),
    body('productId', 'productId can\'t be empty').notEmpty()
];

module.exports = cartValidator;