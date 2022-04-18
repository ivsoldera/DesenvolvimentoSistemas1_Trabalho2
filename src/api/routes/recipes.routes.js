const express = require("express");
const recipesControllers = require('../controllers/recipesControllers');
const authenticatedUser = require('../middlewares/authenticatedUser');

const router = express.Router();

router.post('/', authenticatedUser, recipesControllers.create);
router.get('/', recipesControllers.findAll);
router.get('/:id', recipesControllers.findById);
router.put('/:id', authenticatedUser, recipesControllers.edit);
router.delete('/:id', authenticatedUser, recipesControllers.remove);


module.exports = router;