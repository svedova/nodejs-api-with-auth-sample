const express = require('express');
const accountRoutes = require('./routes/accountRoutes');
const dataRoutes = require('./routes/dataRoutes');
const context = require('./context/database');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/account', accountRoutes);
app.use('/api', dataRoutes);

app.listen(port, () => {
    console.log(`API http://localhost:${port} üzerinde çalışıyor.`);
});
