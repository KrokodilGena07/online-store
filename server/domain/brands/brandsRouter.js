const Router = require('express');
const brandsController = require('./brandsController');
const {brandsValidator, brandsUpdateValidator} = require('./validators/brandsValidator');
const roleMiddleware = require('../../middlewares/roleMiddleware');

const brandsRouter = new Router();

brandsRouter.get('/', brandsController.get);
brandsRouter.post('/', roleMiddleware('ADMIN'), ...brandsValidator, brandsController.create);
brandsRouter.put('/', roleMiddleware('ADMIN'), ...brandsUpdateValidator, brandsController.update);
brandsRouter.delete('/:id', roleMiddleware('ADMIN'), brandsController.delete);

module.exports = brandsRouter;