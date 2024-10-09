const Router = require('express');
const roleMiddleware = require('../../middlewares/roleMiddleware');
const {productsValidator, updateProductsValidator} = require('./validators/productsValidator');
productsController = require('./productsController');

const productsRouter = new Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/one/:id', productsController.getOneById);
productsRouter.get('/list', productsController.getListByIds);
productsRouter.post('/', roleMiddleware('ADMIN'), ...productsValidator, productsController.create);
productsRouter.put('/', roleMiddleware('ADMIN'), ...updateProductsValidator, productsController.update);
productsRouter.delete('/:id', roleMiddleware('ADMIN'), productsController.delete);

module.exports = productsRouter;