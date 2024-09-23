const ApiError = require('../error/ApiError');
const tokenModel = require('../domain/tokens/tokensModel');

function authValidator(req) {
    const accessToken = req.headers?.authorization.split(' ')[1];
    if (!accessToken) {
        throw ApiError.unauthorized();
    }

    const userData = tokenModel.validateAccessToken(accessToken);
    if (!userData) {
        throw ApiError.unauthorized();
    }

    return userData;
}

module.exports = authValidator;