const express = require('express');
const accountRoutes = require('./routes/account.routes');
const dataRoutes = require('./routes/data.routes');

// database bağlantısı sağlanır.
const db = require('./services/database.service');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/account', accountRoutes);
app.use('/api', dataRoutes);

app.listen(port, () => {
    console.log(`API http://localhost:${port} üzerinde çalışıyor.`);
});
