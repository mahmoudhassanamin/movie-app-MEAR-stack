let INITIAL_VALUE={
    movies:false
}
function allMovies(state=INITIAL_VALUE,action) {
    switch(action.type){
        case "GET_ALL_MOVIES":
            return {
                ...state,
                movies:action.payload
            };
        default:
            return state;
    }
}

export default allMovies
