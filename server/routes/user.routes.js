const router = require('express').Router();

// Importamos el controlador'
const userController = require('./../controllers/users.controllers');

// Creamos las rutas
router.post('/user/create', userController.createUser);
router.post('/user/login', userController.loginUser);
router.post('/user/logout', userController.logoutUser);

// Exportamos el router
module.exports = router;