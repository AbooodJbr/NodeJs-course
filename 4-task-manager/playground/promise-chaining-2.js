import e from 'express'
import '../src/db/mongoose.js'
import Task from '../src/models/task.js'

// Task.findByIdAndDelete('65df28958d3e64ba36ec12ef').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed : true})
// }).then(result=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed : true})
    return count 
}

deleteTaskAndCount('65de00b404fb269418758cd6').then(count=>{
    console.log(count)
}).catch(e=>{
    console.log(e)
})