const Router = require('express');
const authRouter = require('../domain/auth/authRouter');
const brandsRouter = require('../domain/brands/brandsRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/brands', brandsRouter);

module.exports = router;