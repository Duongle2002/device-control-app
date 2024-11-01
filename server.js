const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
const connectDB = require('./config/connectDB.cjs');
connectDB();

// Khởi tạo server với Socket.IO để cập nhật dữ liệu thời gian thực
const server = http.createServer(app);
const io = socketIo(server);

// Sử dụng routes cho API điều khiển thiết bị
app.use('/api/device', require('./routes/deviceRoutes'));

// Lắng nghe sự kiện Socket.IO cho dữ liệu thời gian thực
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
