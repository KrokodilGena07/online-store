const Router = require('express');
const authRouter = require('../domain/auth/authRouter');
const brandsRouter = require('../domain/brands/brandsRouter');
const categoriesRouter = require('../domain/categories/categoriesRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/brands', brandsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;