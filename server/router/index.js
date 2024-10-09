const Router = require('express');
const authRouter = require('../domain/auth/authRouter');
const brandsRouter = require('../domain/brands/brandsRouter');
const categoriesRouter = require('../domain/categories/categoriesRouter');
const productsRouter = require('../domain/products/productsRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/brands', brandsRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);

module.exports = router;