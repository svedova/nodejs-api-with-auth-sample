const express = require('express');
const router = express.Router();

// service yapımızın import edilmesi.
const account = require('../controllers/accountController');

// hangi endpoint de hangi iş yapılacaksa onun çağırılması sağlanır.
router.post('/login', account.login);

// bazı endpoint lerde middleware lerin de araya girmesi gerekiyorsa onları da çağırırız.
router.post('/add-new-user', account.authenticate, account.requireAdmin, account.addNewUser);

module.exports = router;