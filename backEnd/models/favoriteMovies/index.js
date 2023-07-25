const mongoose=require("mongoose")
const movieSchema = new mongoose.Schema({
    _id:{userEmail:String,movieId:Number},
    cardTitle: String,
    overview :String,
    poster_path : String,
})

const movieModel = mongoose.model("movieAppFavoriteMovies",movieSchema);

module.exports = movieModel