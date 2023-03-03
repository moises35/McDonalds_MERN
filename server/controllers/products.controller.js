const Product = require('./../models/products.model');

let productos = [
    { name: "Cuarto de Libra", price: 7, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1433427973.jpg" },
    { name: "Doble Cuarto de Libra", price: 9, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1436381129.jpg" },
    { name: "Hamb. con Queso", price: 5, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442266222.png" },
    { name: "McNifica", price: 10, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1433116121.jpg" },
    { name: "McPollo", price: 8, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1434552814.jpg" },
    { name: "Big Mac", price: 12, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1433115048.jpg" },
    { name: "Premium Deluxe", price: 14, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442496879.png" },
    { name: "McVeggie", price: 12, type: "comida", urlImg: "https://upload.wikimedia.org/wikipedia/en/f/f0/McVeggie-PT.jpg" },
    { name: "McFiesta", price: 8, type: "comida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442265854.png" },
    { name: "Gaseosa" , price: 4, type: "bebida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442496818.png" },
    { name: "Jugo" , price: 6, type: "bebida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1434552654.jpg" },
    { name: "Agua S/ Gas" , price: 3, type: "bebida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442325756.png" },
    { name: "Agua C/ Gas" , price: 3, type: "bebida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442325787.png" },
    { name: "Aquarius" , price: 6, type: "bebida", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442325953.png" },
    { name: "McFlurry Oreo", price: 8, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442325116.png" },
    { name: "McFlurry Bis", price: 7, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1574683689.jpg" },
    { name: "McFlurry Kit Kat", price: 7, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1579002754.png" },
    { name: "Sundae Chocolate", price: 4, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1434553246.jpg" },
    { name: "Sundae DDL", price: 4, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1434553621.jpg" },
    { name: "Sundae Frutilla", price: 4, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1434553312.jpg" },
    { name: "Cono Vainilla", price: 5, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442519754.png" },
    { name: "Cono DDL", price: 5, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442519829.png" },
    { name: "Cono Mix", price: 6, type: "postre", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442519875.png" },
    { name: "Cafe Premium", price: 10, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1435675891.png" },
    { name: "Capuchino" , price: 9, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1435675875.png" },
    { name: "Latte" , price: 9, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1435675860.png" },
    { name: "Medialuna" , price: 5, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1435675779.png" },
    { name: "Tostada de J&Q" , price: 8, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1435675746.png" },
    { name: "McQueso" , price: 7, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1435675697.png" },
    { name: "Papas Fritas" , price: 5, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442496709.png" },
    { name: "Nuggets" , price: 9, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1434552041.jpg" },
    { name: "Cajita Feliz" , price: 20, type: "otro", urlImg: "https://www.mcdonalds.com.py/images/cajita_McFiesta_Jr.png" },
    { name: "Side Salad" , price: 16, type: "otro", urlImg: "https://www.mcdonalds.com.py/upload/productos/1442331975.png" }
]

const createProduct = (req, res) => {
    // Creamos un nuevo producto
    Product.create(req.body)
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json(err));
}

// Funcion para cargar muchos productos
const loadProducts = () => {
    console.log("Cargando productos...");
    // Verificamos que no existan productos
    Product.find({})
        .then((products) => {
            if (products.length === 0) {
                // Cargamos los productos
                Product.insertMany(productos)
                    .then(() => console.log("Carga de productos exitosas"))
                    .catch((err) => console.log(err));
            } else {
                console.log("Ya existen productos");
            }
        })
}

// Funcion para devolver todos los productos
const getAllProducts = (req, res) => {
    Product.find({})
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json(err));
}

// Funcion para devolver solo los productos de tipo comida
const getFoodProducts = (req, res) => {
    Product.find({type: "comida"})
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json(err));
}

// Funcion para devolver solo los productos de tipo bebida
const getDrinkProducts = (req, res) => {
    Product.find({type: "bebida"})
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json(err));
}

// Funcion para devolver solo los productos de tipo postre
const getDessertProducts = (req, res) => {
    Product.find({type: "postre"})
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json(err));
}



module.exports = {
    createProduct,
    loadProducts,
    getAllProducts,
    getFoodProducts,
    getDrinkProducts,
    getDessertProducts
}

