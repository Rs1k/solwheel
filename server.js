const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Тестовые маршруты
app.get('/test', (req, res) => {
    res.json({ message: 'GET маршрут работает!' });
});

app.post('/test', (req, res) => {
    res.json({ message: 'POST маршрут работает!', body: req.body });
});

app.listen(PORT, () => {
    console.log(`Test server is running on port ${PORT}`);
});
