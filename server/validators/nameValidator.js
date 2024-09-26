const {body} = require('express-validator');

const nameValidator = body('name', 'name can\'t be empty')
    .isLength({min: 1, max: 255});

const nameUpdateValidator = [
    nameValidator,
    body('id', 'id is wrong').isLength({min: 1, max: 255})
];

module.exports = {
    nameValidator,
    nameUpdateValidator
};