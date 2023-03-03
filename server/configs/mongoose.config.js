const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connection = mongoose.connect(process.env.MONGO_URL)
    .then((db) => {
        console.log('Database connected')
    }).catch((err) => {
        console.log('Error in database connect: ', + err)
    })

module.exports = connection