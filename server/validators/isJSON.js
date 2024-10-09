const {badRequest} = require('../error/ApiError');

function isJSON(data, error) {
    try {
        return JSON.parse(data);
    } catch (e) {
        throw badRequest(error);
    }
}

module.exports = isJSON;