const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/wallet', require('./walletRoutes'));
router.use('/games', require('./gameRoutes'));

module.exports = router;
