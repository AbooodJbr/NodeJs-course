import mongoose from 'mongoose'
import validator from 'validator'

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required:true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save',  function(then){
    const task = this
    console.log('before saving a task')
    then()

})

const Task = mongoose.model("Task", taskSchema)

export default Task