let INITIAL_VALUE = {
    favorites:new Map(),
    size:0
}


function favoriteMovies(state=INITIAL_VALUE,action) {
   
    switch(action.type){
        case "ADD_REMOVE_FROM_FAVORITES":
            let isFavoriteFlag=state.favorites.get(action.payload.movieId)
            if(isFavoriteFlag){
                state.favorites.delete(action.payload.movieId)
                return{
                     ...state,favorites:state.favorites,size:state.favorites.size
                }
                
            }else{
                let {movieId,...movieData} = action.payload
                return {
                    ...state,favorites:state.favorites.set(movieId,movieData),size:state.favorites.size
                }
            }
            default:
                return state
    }
}

export default favoriteMovies
