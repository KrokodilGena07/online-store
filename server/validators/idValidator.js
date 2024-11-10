const {body} = require('express-validator');

const idValidator = [
    body('userId', 'userId invalid').isUUID(),
    body('productId', 'productId is invalid').isUUID()
];

module.exports = idValidator;