const {Router} = require('express');
const cartController = require('./cartController');
const authMiddleware = require('../../middlewares/authMiddleware');
const idValidator = require('../../validators/idValidator');

const cartRouter = new Router();

cartRouter.get('/list/:userId', authMiddleware, cartController.getList);
cartRouter.get('/one', authMiddleware, cartController.getOne);
cartRouter.post('/', authMiddleware, ...idValidator, cartController.create);
cartRouter.put('/', authMiddleware, cartController.update);
cartRouter.delete('/:id', authMiddleware, cartController.delete);

module.exports = cartRouter;