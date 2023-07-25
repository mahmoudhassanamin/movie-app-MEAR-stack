const {movieModel} = require("../../models")

const addRemoveFavorite =async (req,res,next)=>{
    const {userEmail,_id} = req.body
    console.log(req.body)
    try{
        const isFound =await movieModel.findOneAndDelete({userEmail:userEmail,_id:_id})
        if(! isFound){
            const isFound =await movieModel.create({...req.body})
            return res.status(201).json({msg:isFound })
        }
        res.status(200).json({msg:"movie is deleted from the favorites"})
    }catch(err){
        console.log(err)
        next(err)
    }
}
const getAllFavorites = async (req,res,next)=>{
    try{
        const allfavoriteMovies =await movieModel.find()
        res.status(200).json(allfavoriteMovies)
    }catch(err){
        next(err)
    }
}

module.exports={
    addRemoveFavorite,
    getAllFavorites
}