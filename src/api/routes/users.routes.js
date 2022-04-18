const express = require("express");
const usersControllers = 
require('../controllers/usersControllers');

// const authenticatedUser = require('../middlewares/authenticatedUser');

const router = express.Router();

// router.get('/', authenticatedUser, usersControllers.findAll);
router.post('/', usersControllers.create);
// router.get('/:id', usersControllers.findById);
// router.put('/:id', usersControllers.edit);
// router.delete('/:id', usersControllers.remove);

module.exports = router;