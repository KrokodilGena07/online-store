const {body} = require('express-validator');

const authValidator = [
    body('username', 'Username shouldn\'t be empty').notEmpty(), // TODO MAKE MAX 255 SYMBOLS
    body('email', 'Email is invalid').isEmail(),
    body('password', 'Please enter a strong password').isStrongPassword({
        minLength: 10,
        minLowercase: 2,
        minUppercase: 2,
        minNumbers: 2,
        minSymbols: 1
    })
];

module.exports = authValidator;