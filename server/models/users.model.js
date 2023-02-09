const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

// Creamos el esquema con los campos requeridos y sus validaciones
const UserSchemma = new Schema({
    firstName: {
        type: String,
        required: [true, `El campo "First Name" es requerido`],
    },
    lastName: {
        type: String,
        required: [true, `El campo "Last Name" es requerido`],
    },
    userName: {
        type: String,
        required: [true, `El campo "User Name" es requerido`],
        unique: true,
    },
    password: {
        type: String,
        required: [true, `El campo "Password" es requerido`],
        minlength: [8, `El campo "Password" debe tener al menos 8 caracteres`],
    },
}, { timestamps: true });

// Creamos el método para encriptar la contraseña
UserSchemma.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// Creamos el método para comparar las contraseñas
UserSchemma.methods.comparePassword = (password, done) => {
    return bcrypt.compare(password, this.password)
}


const users = mongoose.model('users', UserSchemma)
module.exports = users;