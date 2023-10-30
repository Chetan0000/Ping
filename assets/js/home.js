const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const name = prompt("enter user name to join ");
socket.emit('new-user-joined', name);



// function to add/append message to 

let append = (msg,position) => {
    const item = document.createElement('div');
    // const lineBreaker = createElement('br');
    item.innerText = msg;
    item.classList.add(position);
    messages.append(item);
    // messages.append(lineBreaker);
}





form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value){
        try{
            socket.emit('chat message', input.value);
            append(input.value,'right');
            input.value = '';
        }catch (error) {
            
        }
        
    }
});

socket.on('user-joined',(msg) => {
    append(`${msg} joined the chat`,'middle');
})

socket.on('receive',(data) => {
    append(`${data.user}: ${data.message}`,'left');
    // window.scrollTo(0, document.body.scrollHeight);
})

socket.on('left', (data) => {
    append(`${data} left the room`,'left');
})