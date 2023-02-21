const router = require('express').Router();

// Importamos el controlador'
const userController = require('./../controllers/users.controllers');

// Importamos el middleware
const { protect } = require('./../middlewares/auth.middleware');

// Creamos las rutas
router.post('/user/create', userController.createUser);
router.post('/user/login', userController.loginUser);
router.get('/user/logout', userController.logoutUser);
router.put('/user/update', protect, userController.updateUser);
// router.get('/user/favorites', protect, userController.getFavorites);
router.post('/user/favorites/add', protect, userController.agregarFavorito);
router.delete('/user/favorites/delete', protect, userController.eliminarFavorito);
// Pedids
router.get('/user/pedidos', protect, userController.getAllPedidos);
router.put('/user/pedidos/add', protect, userController.addPedido);
router.put('/user/pedidos/delete', protect, userController.deletePedido);
router.put('/user/pedidos/delete/all', protect, userController.deleteAllPedidos);


// Exportamos el router
module.exports = router;