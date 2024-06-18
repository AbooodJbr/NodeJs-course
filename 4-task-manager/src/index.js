import express from 'express'
import './db/mongoose.js'
import { default as userRouter } from './routers/user.js'
import { default as taskRouter } from './routers/task.js'
import multer from 'multer'
//C:/Users/HP/mongodb/bin/mongod.exe --dbpath=C:/Users/HP/mongodb-data
//bcryptjs
const app = express()
const port = process.env.PORT || 3000

const upload = multer({
    //name of the folder where uploads will be stored
    dest : 'images',
    limits : {
        fileSize : 1000000
    }
})

//middleware, name of the uploads is upload "key is upload"
app.post('/upload', upload.single('upload') ,(req, res)=>{
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('server is up on ' + port)
})

import jwt from 'jsonwebtoken' 
const myFunction = async ()=>{
    //object with field that uniqely defines the document and secret
    const token = jwt.sign({_id : 'abc123'}, 'thisismynewcourse', { expiresIn : '7 days' })
    //console.log(token) 

    //token and secret the same exact secret above
    const data = jwt.verify(token, 'thisismynewcourse')
    //console.log(data)
}
myFunction()