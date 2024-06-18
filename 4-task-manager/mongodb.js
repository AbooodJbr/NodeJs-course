//CRUD : create read update delete

//const mongodb = require('mongodb')
// mongo client gonna give us to the function necessary to connect to the database
//const MongoClient = mongodb.MongoClient

//connection url
//const connectionURL = 'mongodb://127.0.0.1:27017' //default port is 27017
//database were trying to connect to (database name)
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL,(error, client)=>{

//     if(error){
        //we used return to end the function
//         return console.log('unable to connect to database!') 
//     }    
    
//     const db = client.db('databaseName')
//     db.collection('users')
    

// })

import {MongoClient, ObjectId} from "mongodb"
// mongo client gonna give us to the function necessary to connect to the database
// const MongoClient = mongodb.MongoClient

//connection url
const connectionURL = 'mongodb://127.0.0.1:27017' //default port is 27017, 127.0.0.1 : local host ip
const databaseName = 'task-manager'

//const id = new ObjectId()
//console.log(id) //not a string but binary data
//console.log(id.id) //buffer
//console.log(id.id.length) //12
//console.log(id.getTimestamp()) //to get the timeStamp from the id
//console.log(id.toHexString().length) //24 (length double)

//first fetch (promise) then do if theres's no error else 
MongoClient.connect(connectionURL).then( client=>{
console.log('connected to database')
const db=client.db(databaseName)
//1-create
//how to add collection to the data base
//insertOne returns promise, and it inserts one document
// insertOne(object).then(error,result).catch(error)
// db.collection('tasks').insertMany([
//     {
//         completed : true,
//         description : "task1"
//     },
//     {
//         completed : true,
//         description : "task2"
//     },
//     {
//         completed : true,
//         description : "task3"
//     }
// ]).then((error, result)=>{
//     if(error){
//         return console.log(error)
//     }
//     console.log(result.ops)
// }).catch(error=>{
//     console.log(error)
// })

//2-read/find
    //if we search for document when its not available returns null else returns the first object that comes in the collection object//document
    //findOne(object).then(result).catch(error)
    // db.collection('users').findOne({name: 'omar'}).then((user)=>{
    //     console.log(user)
    // }).catch(error=>{
    //     console.log(error)
    // })

//how to find by id
    // db.collection('users').findOne({_id: new ObjectId("65db4e6ec8ea8fc1ed0cdc3d")}).then((user)=>{
    //     console.log(user)
    // }).catch(error=>{
    //     console.log(error)
    // })

//find return cursor that returns pointer to array
//find(object).toArray().then(users).catch(error)
    // db.collection('users').find({age : 19}).toArray().then((users)=>{

    //     console.log(users)
    // })



//3-update :
//update one : updateOne(filter, update).then(result).catch(error)
//db.collection('users').updateOne({name : 'omar'}, {
    //$set:{ //if we use set it doesnt delete other feilds
//         name : 'hossam'
//     }
// }).then((result)=>{
//     console.log(result)
// }).catch(error=>{
//     console.log(error)
// })

//updateMany
// db.collection('users').updateMany({age : 19},{
//     $set:{
//         age : 19.5
//     }
//      $inc:{ //it increament the field
//        age :1 //increament by 1
//        age :-1 //decreament by 1
//}
// }).then(result=>{
//     console.log('documents updated', result)
// }).catch(error=>{
//     console.log('error', error)
// })

//delete
//deleteOne
// db.collection('users').deleteOne({name : 'ali'}).then(result=>{
//     console.log(result)
// }).catch(error=>{
//     console.log(error)
// })

//deleteMany()
// db.collection('users').deleteMany({name : 'ali'}).then(result=>{
//     console.log(result)
// }).catch(error=>{
//     console.log(error)
// })




}).catch(error=>{
    console.log('unable to connect', error)
})




