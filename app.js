const { response } = require('express')
const express = require('express')
const {listen} = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
users = []
connections = []
server.listen(3000)

app.get('/', (req, res)=>{
     res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', (socket)=>{
     // when client connects to server
     connections.push(socket)
     console.log('connected: %s socket connected', connections.length) // current connections
     socket.on('disconnect', (data)=>{
          connections.splice(connections.indexOf(socket), 1) // delete plug details
          console.log('disconnected : %s socket connected', connections.length)
     })
     socket.on('send message', (data)=>{
          console.log(data)
          io.sockets.emit('new message', {msg: data })
     })
})
console.log('server listenin')