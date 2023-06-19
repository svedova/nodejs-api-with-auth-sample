const mongoose = require('mongoose');
const schemas = require('../context/schemas');

// list items
const list = (req, res) => {
    schemas.TestSchema.find()
        .then(items => res.status(200).json(items));
};

// get item by id
const getById = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    
    schemas.TestSchema.findOne({ _id:  id})
        .then(item => {
            if (!item) {
                res.status(404).json({ message: "Böyle bir veri bulunamadı" });
            } else {
                res.status(200).json(item);
            }
        });
};

// add item
const add = (req, res) => {
    let data = new schemas.TestSchema({
        name: req.body.name,
        desc: req.body.desc
    });

    data.save()
        .then(() => res.status(201).json(data._id))
        .catch(err => console.error(`Hata oluştu: `, err));
};

module.exports = {
    list,
    getById,
    add
}