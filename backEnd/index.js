const express = require("express")
const path = require("path")
require("dotenv").config();
const connectToDB=require("./connectToDB")
const {userRouter,movieRouter}=require("./routes")
const cors = require("cors")


const app = express()
app.use(cors({ origin: 'http://localhost:3000'})); // i can to set credentials: true to allow to the front end to send the credentials in the headers
app.use(express.json())
app.use(express.static(path.join(__dirname,"./public")))


app.use("/user",userRouter)
app.use("/movies",movieRouter)







app.use("*",(req,res,next)=>{
  next("page not found")
})

app.use((err,req,res,next)=>{
    let status , msg
    if(err === "page not found"){
        status=404
        msg=err
    }
    else if(err?.code === 11000){
        if(err?.keyValue.userName){
            msg="username must be unique"
            status=409
        }else {
            msg="email must be unique"
            status=409
        }
    }else if(err === "password and confirm password is not equivalent"){
        msg=err
        status=409
        
    }
    else if(err === "invalid email" || err === "invalid password") {
        msg=err
        status=401
    }else if(err === "unactive email"){
        msg=err
        status=403
    }else if (err?.errors){
        status=422
        msg="invalid inputs"
    }else if (err.message === "invalid signature"  ){
        status=400
        msg = err.message
    }else if (err.message === "jwt must be provided" ){
        status=400
        msg = err.message
    }else{
        status=500
        msg="internal server error"
    }
    res.status(status?status:500).json({error:msg?msg:err})
})

connectToDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server listening on 4000")
    })
})