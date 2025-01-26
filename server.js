// Подключаем зависимости
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Создаём приложение Express
const app = express();
const PORT = process.env.PORT || 3000;

// Настраиваем middleware
app.use(bodyParser.json());
app.use(cors());

// Храним данные в памяти (для простоты)
let totalSpins = 0;
let lastResults = []; // Хранит последние 10 результатов

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

    // Увеличиваем количество спинов
    totalSpins++;

    // Добавляем результат
    lastResults.push(result);
    if (lastResults.length > 10) {
        lastResults.shift(); // Удаляем старейший элемент, чтобы хранить только 10
    }

    res.json({ success: true });
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
