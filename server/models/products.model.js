const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, `El campo "name" es requerido`],
    },
    price: {
        type: Number,
        required: [true, `El campo "price" es requerido`],
    },
    urlImg : {
        type: String,
        required: [true, `El campo "urlImg" es requerido`],
    },
    type: {
        type: String,
        required: [true, `El campo "type" es requerido`],
    }
}, { timestamps: true });


const product = mongoose.model('products', ProductSchema)
module.exports = product;