const Router = require('express');
const authRouter = require('../domain/auth/authRouter');
const brandsRouter = require('../domain/brands/brandsRouter');
const categoriesRouter = require('../domain/categories/categoriesRouter');
const productsRouter = require('../domain/products/productsRouter');
const infosRouter = require('../domain/infos/infosRouter');
const cartRouter = require('../domain/cart/cartRouter');
const ratingsRouter = require('../domain/ratings/ratingsRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/brands', brandsRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/infos', infosRouter);
router.use('/cart', cartRouter);
router.use('/ratings', ratingsRouter);

module.exports = router;