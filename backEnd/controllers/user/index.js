const { userModel } = require("../../models")
const nodemailer = require('nodemailer');
let util = require("util");
let jwt = require("jsonwebtoken");
const jwtSignAsync = util.promisify(jwt.sign);

const argon2 = require("argon2")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const generateJWT = async (email) => {
    try {
        const jwtToken = await jwtSignAsync({
            userEmail: email,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })
        return jwtToken
    } catch (err) {
        throw "failed in jwt generation"
    }
}

const register = async (req, res, next) => {
    const { body } = req

    let user = "default"

    try {
        body.confirmed=false
        user = await userModel.create(body)
        req.body=user
        next()
    } catch (err) {
        console.log(err);
        next(err)
    }
}

const login=async (req,res,next)=>{
    const {body:{email,password}} = req
    try{
        const user = await userModel.findOne({email:email})
      
        if(!user){
            console.log("email Error")
            throw "invalid email"
        }
        if(!user.isConfirmed()){
            console.log("confirm error")
            throw "unactive email"
        }
        const isValidPassword = await user.validatePassword(password)
        if(!isValidPassword){
            console.log("password error")
            throw "invalid password"
        }
        const jwtToken = await generateJWT(user.email)
        
        
        // res.cookie('jwt', jwtToken, { httpOnly: false, maxAge: 3600000, path: '/' });
        res.setHeader('authorization', `Bearer ${jwtToken}`);
        res.setHeader('Access-Control-Expose-Headers', 'authorization');
        res.status(200).json({
            status:"successful logging",
        })
    }catch(err){
        console.log("err  : ",err)
        next(err)
    }
}

const sendVerificationEmail = async (req, res, next) => {
    
    try {
        const jwtToken = await generateJWT(req.body.email)
        const emailContent = `
      <h1>Account Verification</h1>
      <p>Click the link below to verify your account:</p>
      <a href="http://localhost:4000/user/verify/${jwtToken}">Verify Account</a>
    `;
    
        const mailOptions = {
            from: process.env.EMAIL, 
            to: req.body.email,
            subject: 'Account Verification',
            html: emailContent, 
        };
        await transporter.sendMail(mailOptions);
        res.status(201).json(req.body);
    } catch (err) {
        userModel.deleteOne({email:req.body.email})
        .then((deletedUser)=>next(err))
        .catch((err)=>next(err))
    }
}

const emailVerification =async (req,res,next)=>{
    const {jwtToken} = req.params
 

    try{
        const userData = jwt.verify(jwtToken,process.env.JWT_SECRET);
        console.log(userData)
        await userModel.updateOne({email:userData.userEmail},{confirmed:true})
        return res.redirect("http://localhost:3000/login");
    }catch(err){
        next(err)
    }
}
module.exports = {
    register,
    sendVerificationEmail,
    emailVerification,
    login
}