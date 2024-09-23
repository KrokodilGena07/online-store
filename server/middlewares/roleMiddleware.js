const ApiError = require('../error/ApiError');
const authValidator = require('../validators/authValidator');

function roleMiddleware(role) {
    return (req, res, next) => {
        try {
            const user = authValidator(req);
            if (role !== user.role) {
                return next(ApiError.forbidden());
            }
            next();
        } catch (e) {
            next(ApiError.unauthorized());
        }
    };
}

module.exports = roleMiddleware;