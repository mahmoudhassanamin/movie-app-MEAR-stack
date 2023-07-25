import { combineReducers } from "redux"
import allMovies from "./allMovies"
import favoriteMovies from "./favoriteMovies"
import logged from "./logged"

export default combineReducers({allMovies,favoriteMovies,logged});
