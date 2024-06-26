const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const {generateMessage, generateLocation} = require('./utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0
let message = ''

io.on('connection', (socket)=>{
    console.log('new websocket connection')

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message', generateMessage(user.username,message))
        callback('delivered')
    })

    socket.on('sendLocation', (loc, callback)=>{
        //url to share location using google maps
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocation(user.username,`https://google.com/maps?q=${loc.latitude},${loc.longitude}`))
        callback('location shared')
    })

    socket.on('join', ({username, room}, callback)=>{
        const {error, user} =  addUser({id : socket.id, username, room})
        if(error){
            return callback(error)
        }
        //to join a spcfic room
        socket.join(user.room)
        socket.emit('message',generateMessage('admin','welcome new user'))
        socket.broadcast.to(user.room).emit('message', generateMessage('admin',`${user.username} has joined`))
        io.to(user.room).emit('roomData', {
            room : user.room,
            users : getUsersInRoom(user.room)
        })
        
        callback()
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',generateMessage('admin',`${user.username} has left`))
            io.to(user.room).emit('roomData', {
                room : user.room,
                users : getUsersInRoom(user.room)
            })
        }
    })

})

server.listen(port, ()=>{
    console.log(`the server is up on port ${port} :)`)
})