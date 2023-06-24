const jwt = require('jsonwebtoken');

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
        return res.status(401).json({ message: 'Unauthorized access.' });
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
    authenticate,
    requireAdmin
}