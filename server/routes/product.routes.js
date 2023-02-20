const router = require('express').Router();

// Importamos el controlador'
const productControllers = require('./../controllers/products.controller');

// Importamos el middleware
const { protect } = require('./../middlewares/auth.middleware');

// Creamos las rutas para los productos con el middleware
router.get('/api/products/load', protect, productControllers.loadProducts);
router.post('/api/products/create', protect, productControllers.createProduct);
router.get('/api/products', protect, productControllers.getAllProducts);
router.get('/api/products/food', protect, productControllers.getFoodProducts);
router.get('/api/products/drink', protect, productControllers.getDrinkProducts);
router.get('/api/products/dessert', protect, productControllers.getDessertProducts);


// Exportamos el router
module.exports = router;