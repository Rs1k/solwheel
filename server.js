const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(bodyParser.json());

// Добавляем CORS, чтобы разрешить запросы с любых источников
app.use(cors()); // Разрешает запросы с любого домена

// Данные сервера (пример)
let totalSpins = 0;
let lastResults = [];

// Маршрут для получения данных
app.get('/api/data', (req, res) => {
    res.json({
        totalSpins,
        lastResults,
    });
});

// Маршрут для отправки нового результата
app.post('/api/spin', (req, res) => {
    const { result } = req.body;

    if (!result || (result !== 'Green' && result !== 'Red')) {
        return res.status(400).json({ error: 'Invalid result' });
    }

    totalSpins++;
    lastResults.push(result);

    if (lastResults.length > 10) {
        lastResults.shift();
    }

    res.json({ success: true });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
