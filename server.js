const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors');

// const axios = require('axios');
// const http = require('http');
const socket = require('socket.io');
const server = require('http').createServer();

const app = express();
const PORT = process.env.PORT || 8080;
io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
});

// app.use(cors())
// app.use(express.static('./client/public'))
// app.use(morgan('combined'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, './client/public')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/public', 'index.html'));
  });
}
  
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));