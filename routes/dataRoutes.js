const express = require('express');
const account = require('../controllers/accountController');
const data = require('../controllers/dataController');
const router = express.Router();

router.get('/data', account.authenticate, data.list);
router.get('/data/:id', account.authenticate, data.getById);
router.post('/data', account.authenticate, account.requireAdmin, data.add);

module.exports = router;