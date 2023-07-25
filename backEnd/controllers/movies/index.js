const {movieModel} = require("../../models")

const addRemoveFavorite =async (req,res,next)=>{
    const {userEmail,movieId,...movieData} = req.body
   
    try{
        const isFound =await movieModel.findOneAndDelete({_id:{userEmail:userEmail,movieId:movieId}})
        if(! isFound){
            const isFound =await movieModel.create({...movieData,_id:{userEmail:userEmail,movieId:movieId}})
            return res.status(201).json({msg:isFound})
        }
        res.status(200).json({msg:"movie is deleted from the favorites"})
    }catch(err){
        console.log(err)
        next(err)
    }
}
const getAllFavorites = async (req,res,next)=>{
    const {userEmail} = req.body
    try{
        const allfavoriteMovies =await movieModel.find({'_id.userEmail':userEmail})
        res.status(200).json(allfavoriteMovies)
    }catch(err){
        next(err)
    }
}

module.exports={
    addRemoveFavorite,
    getAllFavorites
}