const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  const name = prompt('What is your name?')
  appendMessage('You joined','left')
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()      // prevent the page from refreshing
    const message = messageInput.value    
    appendMessage(`You: ${message}`,'right')
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`,'left')
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`,'left')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`,'left')
})

function appendMessage(message,position) {
  const messageElement = document.createElement('div')
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  // messageElement.innerText = message;
  // var d=new Date();
  // var hour=d.getHours();
  // var min=d.getMinutes();
  // messageElement.innerText = message;
  
  messageElement.insertAdjacentHTML('afterbegin',`<p>${message}</p>`);
  messageContainer.append(messageElement);
  
}

// const append = (nam,message, position)=>{
//   const messageElement =document.createElement('div');
  
//   if(position=='left'){
//       audio.play();    
//   }
  
  
