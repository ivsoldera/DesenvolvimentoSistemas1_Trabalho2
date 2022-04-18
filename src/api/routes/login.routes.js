const express = require("express");
const loginControllers = require('../controllers/loginControllers');

const router = express.Router();

router.post('/', loginControllers.login);

module.exports = router;