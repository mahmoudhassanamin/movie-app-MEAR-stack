const router = require("express").Router()
const {userControllers} = require("../../controllers")
const passwordChecker = require("../../middlewares/passwordChecker")
let util = require("util");
let jwt = require("jsonwebtoken");



router.post("/register",passwordChecker,userControllers.register,userControllers.sendVerificationEmail);
router.post("/login",userControllers.login)

router.get("/verify/:jwtToken",userControllers.emailVerification);






module.exports=router