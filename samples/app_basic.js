const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // json formatında gelen body'leri parse etmek için

let data = [
    { id: 1, name: "Örnek 1" },
    { id: 2, name: "Örnek 2" },
];

// Basic Authentication için middleware
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        // Kullanıcı adı ve şifreyi kontrol et
        if (username === 'admin' && password === 'password') {
            return next(); // Kullanıcı adı ve şifre doğruysa bir sonraki middleware'e veya route'a geç
        }
    }

    // Kullanıcı adı veya şifre hatalıysa veya Authorization başlığı eksikse 401 Unauthorized hatası ver
    res.status(401).json({ message: 'Unauthorized' });
};

app.get('/api/data', basicAuth, (req, res) => {
    res.status(200).json(data);
});

app.get('/api/data/:id', basicAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);

    if (!item) {
        return res.status(404).json({ message: "Böyle bir veri bulunamadı" });
    }

    res.status(200).json(item);
});

app.post('/api/data', basicAuth, (req, res) => {
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
