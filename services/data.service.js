const mongoose = require("mongoose");
const dbSchemas = require("./database.schema.service");
const validations = require("../validators/data.validates");

// tüm verilerin çekilmesi.
const list = (req, res) => {
  return res.status(200).json({
    items: [
      { message: "Hello World!", timestamp: Date.now() },
      { message: "How are you?", timestamp: Date.now() },
    ],
  });
};

// id ye göre bir verinin çekilmesi.
const getById = (req, res) => {
  return res
    .status(200)
    .json({ item: { message: "Hello World!", timestamp: Date.now() } });
};

// yeni veri ekleme
const add = (req, res) => {
  const model = ({ name, desc } = req.body);

  const valid = validations.addModelValidateSchema.validate(model);

  if (valid.error)
    return res
      .status(400)
      .json({ message: "Model is not valid.", errors: valid.error.details });

  // hangi koleksiyon ile işlem yapılacaksa
  // onun modeli kullanılır.
  let data = new dbSchemas.TestSchema({
    name: model.name,
    desc: model.desc,
  });

  // save metodu ile insert atılır.
  data
    .save()
    .then(() => res.status(201).json(data._id))
    .catch((err) => res.status(500).json({ message: `Error : ${err}` }));
};

module.exports = {
  list,
  getById,
  add,
};
