const express = require('express');
const app = express();

// Для хранения данных
let totalSpins = 0;
let lastResults = [];

// Настраиваем порт
const PORT = process.env.PORT || 5000;

// Позволяет обрабатывать JSON в запросах
app.use(express.json());

// **GET /api/data**
// Возвращает текущее количество спинов и последние результаты
app.get('/api/data', (req, res) => {
    res.json({
        totalSpins,
        lastResults
    });
});

// **POST /api/spin**
// Обновляет статистику спинов
app.post('/api/spin', (req, res) => {
    const { result } = req.body;

    if (!result) {
        return res.status(400).json({ error: 'Result is required' });
    }

    totalSpins++;
    lastResults.push(result);

    // Храним только последние 10 результатов
    if (lastResults.length > 10) {
        lastResults.shift();
    }

    res.json({
        message: 'Spin recorded successfully',
        totalSpins,
        lastResults
    });
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
