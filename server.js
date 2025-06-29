// server.js - Real-time Online Users Backend
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: "*" }
});

let users = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // When a user comes online
  socket.on('user-online', (user) => {
    console.log('User online:', user.name);
    // Remove any existing user with same ID to avoid duplicates
    users = users.filter(u => u.id !== user.id);
    // Add the new user
    users.push({ ...user, socketId: socket.id, status: 'online', connectedAt: new Date() });
    // Send updated user list to all clients
    io.emit('online-users', users);
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    users = users.filter(u => u.socketId !== socket.id);
    io.emit('online-users', users);
  });

  // Handle user status updates
  socket.on('user-status-update', (userData) => {
    const userIndex = users.findIndex(u => u.id === userData.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      io.emit('online-users', users);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
  console.log(`Server is ready for real-time user connections!`);
}); 