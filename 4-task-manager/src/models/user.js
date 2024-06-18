import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = mongoose.Schema({
    name: {
        //validation
        type: String,
        trim: true,
        required: true, //made the name required
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,//remove spaces
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number') //validation
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('password cant include the word "password" ')
        }

    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })


    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


//schema.pre is before using it(before creating doc)
//first event second function not arrow
//hash the plain text password before saving
userSchema.pre('save', async function (next) {
    //this : doc were saving
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8) //to override password
    }


    console.log('just before saving')
    //if we dont call next it wont continue
    next()
})

//first name, second feilds we wanna have
const User = mongoose.model('User', userSchema)

export default User