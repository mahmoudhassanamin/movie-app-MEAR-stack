import axios from "axios";

export const moviesAxios = axios.create({
    baseURL:"https://api.themoviedb.org/3",
})



// export default moviesAxios