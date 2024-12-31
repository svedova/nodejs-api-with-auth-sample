const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/account.middleware");
const dataService = require("../services/data.service");

router.get("/data", dataService.list);
router.get("/data/:id", dataService.getById);
router.post(
  "/data",
  middleware.authenticate,
  middleware.requireAdmin,
  dataService.add
);

module.exports = router;
