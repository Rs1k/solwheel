const express = require('express');
const app = express();

// Используем порт из переменной окружения или 5000 по умолчанию
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, Git!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
