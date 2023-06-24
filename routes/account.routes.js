const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/account.middleware');
const accountService = require('../services/account.service');

// hangi endpoint de hangi iş yapılacaksa onun çağırılması sağlanır.
router.post('/login', accountService.login);

// bazı endpoint lerde middleware lerin de araya girmesi gerekiyorsa onları da çağırırız.
router.post('/add-new-user', middleware.authenticate, middleware.requireAdmin, accountService.addNewUser);

module.exports = router;