const express = require('express');
const router = express.Router();

// bazı middleware lere erişmek için.
const account = require('../controllers/accountController');

// service yapımızın import edilmesi.
const data = require('../controllers/dataController');

router.get('/data', account.authenticate, data.list);
router.get('/data/:id', account.authenticate, data.getById);
router.post('/data', account.authenticate, account.requireAdmin, data.add);

module.exports = router;