//the websocket connected  
const socket = io()

//things we wanna disable when sending
const messageForm = document.getElementById('message-form')
const messageFormInput = document.querySelector('input')
const messageFormButton = document.querySelector('.msg-btn') //Changed getElementsByClassName to querySelector
const sendLocationButton = document.getElementById('send-location') //Added missing selector for send-location button
const messages = document.getElementById('messages')
 
//templates
const messageTemplate = document.getElementById('message-template').innerHTML
const locationTemplate = document.getElementById('location-template').innerHTML
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML

//options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix : true})

//to scroll down to the new message automatically
const autoscroll = ()=>{
    //new message element
    const newMessage = messages.lastElementChild

    //height of new message
    const newMessageStyles = getComputedStyle(newMessage) //get styles
    const newMessageMargin = parseInt(newMessageStyles.marginBottom) //get the margin value
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin //get the margin and add it to the height

    //visible height
    const visibleHeight = messages.offsetHeight

    //height of new messages container 
    const containerHeight = messages.scrollHeight

    //how far have i scrolled ?
    const scrollOffset = messages.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight <= scrollOffset){
        messages.scrollTop = messages.scrollHeight
    }
}

socket.on('message', (message)=>{

    //to render messages
    const html = Mustache.render(messageTemplate,{
        message : message.text ,
        createdAt : moment(message.createdAt).format('h:mm a.'),
        username : message.username
    })
    //beforeend to add mesagges in the bottom of out element
    messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (url)=>{
    const html = Mustache.render(locationTemplate,{
        url : url.url,
        createdAt : moment(url.createdAt).format('h:mm a.'),
        username : url.username
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({room, users})=>{
    const html = Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.getElementById('sidebar').innerHTML = html
})


document.getElementById('message-form').addEventListener('submit', (e)=>{
    e.preventDefault()

    messageForm.disabled = true
    messageFormInput.disabled = true
    messageFormButton.disabled = true
    //disable the form until the message is enf
    const message = document.querySelector('input').value
    socket.emit('sendMessage', message, (message)=>{

        messageForm.disabled = false
        messageFormInput.disabled = false
        messageFormButton.disabled = false
        //reanable the form after the message has been sent
        console.log('your messsage has been sent to the server ' + message)
    })

    document.querySelector('input').value = ''
})

document.getElementById('send-location').addEventListener('click', ()=>{
    //we see if it doest support the navigator geolcation to make a return and finish the function
    if(!navigator.geolocation){
        return alert('geolocation is not supported by your browser')
    }

    sendLocationButton.disabled=true
    //this doesnt support promises, u pass a function to it
    navigator.geolocation.getCurrentPosition((position)=>{

        socket.emit('sendLocation', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }, (message)=>{
            //enable here 
            console.log(message)
        })
    })

})

socket.emit('join',{username, room}, (error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})