let util = require("util");
let jwt = require("jsonwebtoken");
const jwtVerify = util.promisify(jwt.verify);

async function isAuthorized(req, res, next) {
    try {
        const decodedJWT = await jwtVerify(req.headers.authorization, process.env.JWT_SECRET)
        console.log(decodedJWT.userEmail)
        req.body.userEmail=decodedJWT.userEmail
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = isAuthorized
