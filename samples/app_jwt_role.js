const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

let data = [
    { id: 1, name: "Örnek 1" },
    { id: 2, name: "Örnek 2" },
];

const secretKey = "mysecretkey"; // JWT için gizli anahtarınız

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Basit bir kullanıcı adı ve şifre kontrolü
    if (username === 'admin' && password === 'password') {
        // Kullanıcı adı ve şifre doğruysa ve kullanıcı admin ise, role olarak 'admin' belirle
        const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else if (username === 'user' && password === 'password') {
        // Kullanıcı adı ve şifre doğruysa ve kullanıcı normal bir kullanıcı ise, role olarak 'user' belirle
        const token = jwt.sign({ username, role: 'user' }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// JWT ile kimlik doğrulaması için middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Sadece admin kullanıcılarına izin veren bir middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'This resource requires admin access' });
    }
    next();
};

app.get('/api/data', authenticateJWT, (req, res) => {
    res.status(200).json(data);
});

app.get('/api/data/:id', authenticateJWT, (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);

    if (!item) {
        return res.status(404).json({ message: "Böyle bir veri bulunamadı" });
    }

    res.status(200).json(item);
});

app.post('/api/data', authenticateJWT, requireAdmin, (req, res) => {
    const newItem = {
        id: data.length + 1,
        name: req.body.name,
    };

    data.push(newItem);
    res.status(201).json(newItem);
});

app.listen(port, () => {
    console.log(`API http://localhost:${port} üzerinde çalışıyor.`);
});
