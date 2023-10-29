const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const name = prompt("enter user name to join ");
socket.emit('new-user-joined', name);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value){
        try{
            socket.emit('chat message', input.value);
            input.value = '';
        }catch (error) {
            
        }
        
    }
});

socket.on('receive',(msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
})