const mongoose=require("mongoose")
const movieSchema = new mongoose.Schema({
    _id:Number,
    cardTitle: String,
    overview :String,
    poster_path : String,
    userEmail:String
},{
    _id:false
})

const movieModel = mongoose.model("movieAppFavoriteMovies",movieSchema);

module.exports = movieModel