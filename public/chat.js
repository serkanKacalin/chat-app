const socket = io.connect('http://localhost:3000');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

submitBtn.addEventListener('click', () => {
    socket.emit('chat', { // emit ile köprü oluşturuyoruz yani : browserdan -> servera , serverdan browser a
        // bilgilerin akışını sağlayacağız.
        // önce sokete burdan gelen bilgileri gönderelim.
        message: message.value,
        sender: sender.value,
    })
})

socket.on('chat', data => {
    feedback.innerHTML = ''; // chate mesaj düştüğünde feedback bilgisini yani yaziyor bilgisini sifirladik bu durumda.
    output.innerHTML += '<p><strong>' + data.sender + ' :</strong>' + data.message + '</p>'
    message.value = ''; 

})

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value);
})

socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + ' yaziyor...</p>' 
})