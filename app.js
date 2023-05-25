const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
     cors: {
          origin: [ "http://localhost:3000"]
     }
})
users = []
connections = []
server.listen(3000)


app.get('/', (req, res) => {
     res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', (socket) => {
     // when client connects to server
     connections.push(socket)
     console.log('connected: %s socket connected', connections.length) // current connections
     socket.on('disconnect', (data) => {
          connections.splice(connections.indexOf(socket), 1) // delete plug details
          console.log('disconnected : %s socket connected', connections.length)
     })
     socket.on('send message', (data, room) => {
          console.log("room" + room)
          if (room === '') {
               io.sockets.emit('new message', { msg: data })
          } else {
               io.to(room).emit('new message', { msg: data })
          }
     })

     socket.on('join-room', room => {
          socket.join(room)
     })
})
console.log('server listening')