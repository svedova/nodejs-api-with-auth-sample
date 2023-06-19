const jwt = require('jsonwebtoken');
const schemas = require('../context/schemas');

const secretKey = "mysecretkey"; // JWT için gizli anahtarınız

// Kullanıcı adı ve şifre ile kimlik doğrulama ve token üretme
const login = (req, res) => {
    const { username, password } = req.body;

    // Basit bir kullanıcı adı ve şifre kontrolü
    schemas.UserSchema.findOne({ username: username, password: password })
        .then(user => {
            if (user) {
                // Kullanıcı adı ve şifre doğruysa ve kullanıcıyı role ile belirle
                const token = jwt.sign({ username, role: user.role }, secretKey, { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Unauthorized access.' });
            }
        });
};

// Kullanıcı insert kodu.
const addNewUser = (req, res) => {
    const { username, password, role } = req.body;

    // Yeni bir kullanıcı oluşturma
    let user = new schemas.UserSchema({
        username: username,
        password: password,
        role: role,
        lastLoginDate: new Date()
    });

    // Kullanıcıyı veritabanına ekleme
    user.save()
        .then(() => res.status(201).json({ user }))
        .catch(err => res.status(500).json({ message: `Error : ${err} - Username : ${username}` }));
};

// JWT ile kimlik doğrulaması için middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden access.' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized access.' });
    }
};

// Sadece admin kullanıcılarına izin veren bir middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'This resource requires admin access' });
    }
    next();
};

module.exports = {
    login,
    authenticate,
    requireAdmin,
    addNewUser
}