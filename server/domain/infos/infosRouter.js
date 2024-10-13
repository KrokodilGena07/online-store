const Router = require('express');
const roleMiddleware = require('../../middlewares/roleMiddleware');
const infosController = require('./infosController');
const {updateInfosValidator, infosValidator} = require('./validators/infosValidator');

const infosRouter = new Router();

infosRouter.post('/', roleMiddleware('ADMIN'), ...infosValidator, infosController.create);
infosRouter.put('/', roleMiddleware('ADMIN'), ...updateInfosValidator, infosController.update);
infosRouter.delete('/:id', roleMiddleware('ADMIN'), infosController.delete);

module.exports = infosRouter;