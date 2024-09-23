const ApiError = require('../error/ApiError');
const authValidator = require('../validators/authValidator');

async function authMiddleware(req, res, next) {
    try {
        authValidator(req);
        next();
    } catch (e) {
        next(ApiError.unauthorized());
    }
}

module.exports = authMiddleware;