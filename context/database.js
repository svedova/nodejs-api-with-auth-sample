const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect('mongodb://localhost:27017/firstnodeapidb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('Database connection successfully!')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()