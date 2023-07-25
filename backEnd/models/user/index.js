const mongoose=require("mongoose")
const argon2=require("argon2")
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        minLength:10,
        match:/^[a-zA-Z\s]+$/g,
        maxLength:20
    },
    email:{
        type:String,
        match:/^\S+@\S+\.\S+$/,
        unique:true,
    },
    userName:{
        type:String,
        minLength:10,
        match:/^[a-zA-Z0-9]+$/g,
        maxLength:20,
        unique:true
    },
    password:{
        type:String,
        minLength:8,
    },
    confirmed:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
}
)

userSchema.pre("save",async function (next){
    try{
        let hashedPassword = await argon2.hash(this.password);
        this.password=hashedPassword;
    }
    catch(err){
       next("password hashing error");
    }
})
userSchema.methods.validatePassword=function (password){
    return argon2.verify(this.password,password);
}
userSchema.methods.isConfirmed = function () {return this.confirmed} 
const userModel = mongoose.model("movieAppUsers",userSchema)

module.exports = userModel