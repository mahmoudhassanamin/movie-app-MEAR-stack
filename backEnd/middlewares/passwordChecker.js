const passwordChecker = (req, res, next) => {
    const {body}=req;
    try {
        if (body.password !== body.confirmPassword) {
            throw "password and confirm password is not equivalent"
        }
        next()
    }catch(err){
        next(err)
    }
}

module.exports= passwordChecker;