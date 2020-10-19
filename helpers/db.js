const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_STRING,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,
        useNewUrlParser: true } )
    mongoose.connection.on('open', () => {
        console.log('MONGOD HAS ARISEN')
    })
    mongoose.connection.on('error', (err) => {
        console.log('MONGOD HAS FALLEM', err)
    })


    mongoose.Promise= global.Promise;
};