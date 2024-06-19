import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000', // Замените на порт вашего фронтенда
    methods: ['GET', 'POST'],
  },
});

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string | 'Arslan';
  role: 'client' | 'employee';
}

const users: User[] = [];
const messages: Message[] = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Новый пользователь
  const newUser: User = {
    id: socket.id,
    name: '',
    role: 'client', // По умолчанию - клиент
  };
  users.push(newUser);
  io.emit('users', users);

  // Обработка события "user joined"
  socket.on('user joined', (userData: User) => {
    const existingUser = users.find((user) => user.id === socket.id);
    if (existingUser) {
      // Обновление имени пользователя
      existingUser.name = userData.name;
      io.emit('users', users);
    }
  });

  // Обработка отправки сообщения
  socket.on('message', (message: Message) => {
    messages.push(message);
    io.emit('message', message); 
  });

  // Обработка отключения пользователя
  socket.on('disconnect', () => {
    const userIndex = users.findIndex((user) => user.id === socket.id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      io.emit('users', users);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});