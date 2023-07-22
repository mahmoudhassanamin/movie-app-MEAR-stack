const {userModel} = require("../../models")

const register = (user)=>userModel.create(user);

module.exports={
    register
}