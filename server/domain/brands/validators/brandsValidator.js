const {body} = require('express-validator');

const brandsValidator = [
    body('name', 'name can\'t be empty').isLength({min: 1, max: 255})
];

const brandsUpdateValidator = [
    ...brandsValidator,
    body('id', 'id is wrong').isLength({min: 1, max: 255})
];

module.exports = {
    brandsValidator,
    brandsUpdateValidator
};