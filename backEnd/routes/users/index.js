const router = require("express").Router()
const {userControllers} = require("../../controllers")

router.post("/register",async (req,res,next)=>{
    const {body} = req
    try{
        if(body.password !== body.confirmPassword){
            throw "password and confirm password is not equivalent"
        }
        const user =await userControllers.register(body)
        res.status(201).json(user);
    }catch(err){
        next(err)
    }
})






/*
-ensure email is not in DB
-ensure the password and confirm password are equal
-password encryption
-create user
-return response without the password
**/




module.exports=router