const Router = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const ratingsController = require('./ratingController');
const idValidator = require('../../validators/idValidator');

const ratingsRouter = new Router();

ratingsRouter.get('/', authMiddleware, ratingsController.get);
ratingsRouter.post('/like', authMiddleware, ...idValidator, ratingsController.like);
ratingsRouter.post('/dislike', authMiddleware, ...idValidator, ratingsController.dislike);

module.exports = ratingsRouter;