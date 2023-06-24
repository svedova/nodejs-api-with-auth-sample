const mongoose = require('mongoose');
const dbSchemas = require('./database.schema.service');

// tüm verilerin çekilmesi.
const list = (req, res) => {
    // find metodu ile filtresiz veri çekme.
    dbSchemas.TestSchema.find()
        .then(items => res.status(200).json({ items }));
};

// id ye göre bir verinin çekilmesi.
const getById = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    // findOne metodu kullanılır. 
    // _id mongo db de otomatik oluşan key kolon adıdır.
    dbSchemas.TestSchema.findOne({ _id: id })
        .then(item => {
            if (!item) {
                return res.status(404).json({ message: "Not found." });
            } else {
                return res.status(200).json({ item });
            }
        });
};

// yeni veri ekleme
const add = (req, res) => {

    // hangi koleksiyon ile işlem yapılacaksa
    // onun modeli kullanılır.
    let data = new dbSchemas.TestSchema({
        name: req.body.name,
        desc: req.body.desc
    });

    // save metodu ile insert atılır.
    data.save()
        .then(() => res.status(201).json(data._id))
        .catch(err => res.status(500).json({ message: `Error : ${err}` }));
};

module.exports = {
    list,
    getById,
    add
}