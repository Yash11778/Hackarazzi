const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('offer', offer => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', answer => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', candidate => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post('/translate', async (req, res) => {
  const { frame } = req.body;
  // Process the frame with your model and return the result
  // const result = await model.predict(frame);
  res.json({ letter: 'A' }); // Example response
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
