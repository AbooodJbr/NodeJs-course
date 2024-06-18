import '../src/db/mongoose.js'
import User from '../src/models/user.js'

User.findByIdAndUpdate('65ddf74a1c590f26ed792d24', {age:22}).then((user)=>{
    console.log(user)
    return User.countDocuments({age : 22})
}).then(result=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

const updateAgeAndCount = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('65ddf74a1c590f26ed792d24', 19).then(count=>{
    console.log(count)
}).catch(e=>{
    console.log(e)
})