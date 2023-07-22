const mongoose = require("mongoose")

module.exports =()=>{
    return mongoose.connect(process.env.CONNECTIONsTRING)
    .then(()=>{
        console.log("Database connection is success")
    })
    .catch(()=>{
        console.log("Database connection is failed")
        console.log("server closed")
        process.exit(1);
    })
} 