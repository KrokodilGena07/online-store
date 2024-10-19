const Router = require('express');
const roleMiddleware = require('../../middlewares/roleMiddleware');
const categoriesController = require('./categoriesController');
const {
    nameValidator,
    nameUpdateValidator
} = require('../../validators/nameValidator');

const categoriesRouter = new Router();

categoriesRouter.get('/', categoriesController.get);
categoriesRouter.post('/', roleMiddleware('ADMIN'), nameValidator, categoriesController.create);
categoriesRouter.put('/', roleMiddleware('ADMIN'), ...nameUpdateValidator, categoriesController.update);
categoriesRouter.delete('/:id', roleMiddleware('ADMIN'), categoriesController.delete);

module.exports = categoriesRouter;