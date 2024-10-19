const {Router} = require('express');
const cartController = require('./cartController');
const authMiddleware = require('../../middlewares/authMiddleware');
const cartValidator = require('./validators/cartValidator');

const cartRouter = new Router();

cartRouter.get('/list/:userId', authMiddleware, cartController.getList);
cartRouter.get('/one', authMiddleware, cartController.getOne);
cartRouter.post('/', authMiddleware, ...cartValidator, cartController.create);
cartRouter.put('/', authMiddleware, cartController.update);
cartRouter.delete('/:id', authMiddleware, cartController.delete);

module.exports = cartRouter;