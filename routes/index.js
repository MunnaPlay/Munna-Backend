const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/wallet', require('./walletRoutes'));

module.exports = router;
