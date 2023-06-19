const express = require('express');
const account = require('../controllers/accountController');
const router = express.Router();

router.post('/login', account.login);
router.post('/add-new-user', account.authenticate, account.requireAdmin, account.addNewUser);

module.exports = router;