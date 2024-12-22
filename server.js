const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Создаем приложение Express
const app = express();

// Создаем HTTP сервер
const server = http.createServer(app);

// Инициализируем Socket.IO на сервере
const io = socketIo(server);

// Обслуживаем статичные файлы из папки "public"
app.use(express.static('public'));

// Обрабатываем подключение пользователей
io.on('connection', (socket) => {
    console.log('New user connected');
    
    // Слушаем сообщения от клиента
    socket.on('message', (message) => {
        console.log(message);
        
        // Отправляем сообщение всем подключенным пользователям
        io.emit('message', message);
    });

    // Логируем, когда пользователь отключается
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Запуск сервера на порту 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
