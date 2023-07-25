let INITIAL_VALUE = {
    favorites: new Map(),
    size: 0
}


function favoriteMovies(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            let { movieId, ...movieData } = action.payload
            return {
                ...state, favorites: state.favorites.set(movieId, movieData), size: state.favorites.size
            }
        case "REMOVE_FROM_FAVORITES":
            state.favorites.delete(action.payload.movieId)
            return {
                ...state, favorites: state.favorites, size: state.favorites.size
            }

        case "CLEAR_FAVORITES":
            return {
                ...state,
                favorites: new Map(),
                size: 0
            }
        default:
            return state
    }
}

export default favoriteMovies
