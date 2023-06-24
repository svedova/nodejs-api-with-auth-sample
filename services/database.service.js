const mongoose = require('mongoose');

class Database {

    constructor() {
        this._connect()
    }

    _connect() {
        // veri tabanı bağlantısı oluşturulur. 
        // veri tabanı adı: firstnodeapidb
        mongoose.connect('mongodb://localhost:27017/firstnodeapidb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                // bağlantı oluştuğunda console a bu mesaj çıkar.
                // başka işlemleri bu aşamada yapabilirsiniz.
                console.log('Database connection successfully!')
            })
            .catch(err => {
                // bağlantı hata aldığında console a bu mesaj çıkar.
                // başka işlemleri bu aşamada yapabilirsiniz.
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()