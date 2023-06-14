const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3000;

// CORS için varsayılan yapılandırmayı 
// kullan(tüm kaynaklardan gelen tüm istek türlerine izin ver)
app.use(cors());

// json formatında gelen body'leri parse etmek için
app.use(express.json());

// GET isteği için geri döndürülecek basit bir JSON verisi.
let data = [
    { id: 1, name: "Örnek 1" },
    { id: 2, name: "Örnek 2" },
];

const secretKey = "mysecretkey"; // JWT için gizli anahtarınız

// Login olunarak Token alınacak endpoint imiz.
// Bunda bir güvenlik yok, olmamalı.
// JWT kimlik doğrulama middleware devrede değil.
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Basit bir kullanıcı adı ve şifre kontrolü
    if (username === 'admin' && password === 'password') {
        // Kimlik doğrulaması başarılı olduğunda bir JWT oluştur
        // Burada oluşan token süresi 1 saat dir.
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
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

app.get('/api/data', authenticateJWT, (req, res) => {
    res.status(200).json(data);
});

app.get('/api/data/:id', authenticateJWT, (req, res) => {
    // req.params.id ile id parametresi okunabilir.
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);

    if (!item) {
        return res.status(404).json({ message: "Böyle bir veri bulunamadı." });
    }

    res.status(200).json(item);
});

app.post('/api/data', authenticateJWT, (req, res) => {
    // req.body.name ile request 'in body sindeki json nesneye erişilir.
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