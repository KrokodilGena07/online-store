const {body} = require('express-validator');

const nameValidator = body('name', 'name is invalid')
    .isLength({min: 1, max: 255});

const nameUpdateValidator = [
    nameValidator,
    body('id', 'id is invalid').isUUID()
];

module.exports = {
    nameValidator,
    nameUpdateValidator
};