const Router = require('express');
const brandsController = require('./brandsController');
const roleMiddleware = require('../../middlewares/roleMiddleware');
const {nameValidator, nameUpdateValidator} = require('../../validators/nameValidator');

const brandsRouter = new Router();

brandsRouter.get('/', brandsController.get);
brandsRouter.post('/', roleMiddleware('ADMIN'), nameValidator, brandsController.create);
brandsRouter.put('/', roleMiddleware('ADMIN'), ...nameUpdateValidator, brandsController.update);
brandsRouter.delete('/:id', roleMiddleware('ADMIN'), brandsController.delete);

module.exports = brandsRouter;