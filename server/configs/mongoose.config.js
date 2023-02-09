const mongoose = require('mongoose');

const mongodb = {
    host: 'localhost',
    user: '',                   
    password: '',               
    database: 'McDonalds',
    port: 27017 
}

mongoose.set('strictQuery', true);

const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
    .then((db) => {
        console.log('Database connected')
    }).catch((err) => {
        console.log('Error in database connect: ', + err)
    })

module.exports = connection