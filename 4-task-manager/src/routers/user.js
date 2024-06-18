import express from 'express'
import User from '../models/user.js'
import auth from '../middleware/auth.js'
const router = new express.Router()

//we will hash password when creating and updating users


//sign up
//first path, second callback function(route handler) : route handler

router.post('/users' ,async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

//sign in
//route to login with our accounts
router.post('/users/login', async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send()
    }
})

router.get('/users', async(req, res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(400).send()
    }
})

//its gonna run the route handler if the middleware calls the next() function
//first it runs the middleware then the route handler,
//if we dont use next() in the middleware it wont run the route handler
router.get('/users/me', auth ,async (req, res) => {
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.send(users) 
    // } catch (e) {
    //     res.status(500).send()
    // }
    // User.find({}).then(users=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

//how to use routes
router.get('/users/:id', auth , async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user)
            return res.status(404).send()

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

    //now we can use findOne() or findById()
    // User.findById(_id).then(user=>{
    //     if(!user)
    //     return res.status(404).send()

    //     res.send(user)
    // }).catch(error=>{
    //     res.status(500).send()
    // })
})


//updating 
router.patch('/users/:id', auth , async (req, res)=>{
    //if u wanna update the feilds you have only(dont add a new feild)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    //.every is boolean if one is false it retuens false if all true return true
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({"error": "invalid updates!"})
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update)=> user[update] = req.body[update] )
        await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id ,req.body, {new : true, runValidators: true} )
        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
})

//delete
router.delete('/users/:id', auth , async (req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send('')
        }

        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

//we have to be authenticated if we wanna logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        // Filter out the token that was used for authentication
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        
        // Save the updated user
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});


export default router


