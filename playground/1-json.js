const book = {
    title : 'no tears left to cry',
    author : 'ariana'
}

// JSON.stringfy : takes an object and return JSON
//const bookJSON = JSON.stringify(book)
//console.log(bookJSON)

// JSON.parse : takes JSON and return an object
//const bookOBJ = JSON.parse(bookJSON)
//console.log(bookOBJ)

const fs = require('fs')

//fs.writeFileSync('1-json.json', bookJSON)
// const dataBuffer = fs.readFileSync('1-json.json')
//console.log(dataBuffer)

// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data)
// console.log(data.title)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// data.name='abood'
// data.age='19'
// const dataJSON1 = JSON.stringify(data)
// fs.writeFileSync('1-json.json', dataJSON1)