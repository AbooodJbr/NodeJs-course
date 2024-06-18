import jwt from 'jsonwebtoken'
import User from '../models/user.js'

//we didnt put the auth in the index because it will be used for evey single route which is not what we want 

const auth = async (req, res, next)=>{
    try{
        console.log(req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token) 
        const decoded = jwt.verify(token, 'thisismysecret') //we should use the same secret we used in models
        //find the user with that id and that token
        const user = await User.findOne({_id  : decoded._id, 'tokens.token' : token})
        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error: 'please authenticate'})
    }
    
}

export default auth