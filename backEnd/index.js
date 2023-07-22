const express = require("express")
const path = require("path")
require("dotenv").config();
const connectToDB=require("./connectToDB")
const {userRouter}=require("./routes")
const cors = require("cors")


const app = express()
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())
app.use(express.static(path.join(__dirname,"./public")))
app.use("/user",userRouter)






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
        msg="email must be unique"
        status=409
    }else if(err === "password and confirm password is not equivalent"){
        msg=err
        status=409
    }else if (err ==="password hashing error"){
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