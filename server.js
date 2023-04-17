const express = require('express')
const socket = require('socket.io')

const app = express() 
const server = app.listen(3000)

app.use(express.static('public'))

const io = socket(server);
io.on('connection', (socket) =>  { // bir bağlantı gerçekleşirse algılıyoruz . socket adında bir parametre ile yakalyıoruz.
    console.log(socket.id);

    socket.on('chat', data => { // socket.on diyerek chat'i dinlemeye başladık
        io.sockets.emit('chat', data) // browserlara yani bütün bağlantılara bu datayı gönderiyoruz.
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data) // broadcast ile bütün browserlara bu veriyi verdik.
    }) // chat.jsde 'typing' için yazdığımız fonksiyona burdan data gönderiyoruz.
})