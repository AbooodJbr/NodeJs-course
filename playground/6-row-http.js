//we can use 'request' module instead of this because its easier for us
//both have the same job which is getting data from api

const http = require('http')
const url = "http://api.weatherstack.com/current?access_key=2deb5f7be12797b32a95ff5225361aa4&query=40,75"
const request = http.request(url, (response)=>{
    let data = ''
    response.on('data', (chunk)=>{ //it runs everytime we have chunk
        data = data + chunk.toString() //to turn the buffer into string
    })

    response.on('end', ()=>{ //it runs one time only, when it end 
        const body = parse(data)
        console.log(body)
    })
})

//error handling
request.on('error', (error)=>{
    console.log('An error occured :', error)
})

request.end()