const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected');
  });

  socket.on('offer', (offer, roomId) => {
    console.log(`Offer received in room ${roomId}:`, offer);
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', (answer, roomId) => {
    console.log(`Answer received in room ${roomId}:`, answer);
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate, roomId) => {
    console.log(`ICE candidate received in room ${roomId}:`, candidate);
    socket.to(roomId).emit('ice-candidate', candidate);
  });

  socket.on('chat-message', (message, roomId) => {
    console.log(`Chat message received in room ${roomId}:`, message);
    // Fixed the typo in the event name and broadcasting to the room
    socket.to(roomId).emit('receiveChat-message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

httpServer.listen(3001, () => {
  console.log('Signaling server running on port 3001');
});
