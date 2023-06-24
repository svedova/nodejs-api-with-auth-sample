const jwt = require('jsonwebtoken');
const dbSchemas = require('./database.schema.service');
const validations = require('../validators/account.validate');

const secretKey = "mysecretkey"; // JWT için gizli anahtarınız

// Kullanıcı adı ve şifre ile kimlik doğrulama ve token üretme
const login = (req, res) => {
    const model = { username, password } = req.body;

    const valid = validations.loginModelValidateSchema.validate(model);

    if (valid.error)
        return res.status(400).json({ message: 'Model is not valid.', errors: valid.error.details });

    // Basit bir kullanıcı adı ve şifre kontrolü
    dbSchemas.UserSchema.findOne({ username: username, password: password })
        .then(user => {
            if (user) {
                // Kullanıcı adı ve şifre doğruysa ve kullanıcıyı role ile belirle
                // geriye 1 saatlik token döndürülür.
                const token = jwt.sign({ username, role: user.role }, secretKey, { expiresIn: '1h' });
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ message: 'Unauthorized access.' });
            }
        });
};

// Kullanıcı insert kodu.
const addNewUser = (req, res) => {
    const { username, password, role } = req.body;

    // Yeni bir kullanıcı oluşturma
    let user = new dbSchemas.UserSchema({
        username: username,
        password: password,
        role: role,
        lastLoginDate: new Date()
    });

    // Kullanıcıyı veritabanına ekleme ve işlem başarılı ise 
    // geriye kullanıcı nesnesini döndürme.
    user.save()
        .then(() => res.status(201).json({ user }))
        .catch(err => res.status(500).json({ message: `Error : ${err} - Username : ${username}` }));
};



module.exports = {
    login,
    addNewUser
}