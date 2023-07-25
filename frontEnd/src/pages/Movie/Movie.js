import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { moviesAxios } from '../../network/getMovies'
import CustomCard from '../../components/CustomCard/CustomCard'
import { useSelector } from 'react-redux'
function Movie() {
    const {id} = useParams()
    const [movieData,setMoviedata] = useState({})
    let favoriteMovies = useSelector(state=>state.favoriteMovies.favorites)
    useEffect(()=>{
      moviesAxios.get(`/movie/${id}?api_key=d4441590fcc88a2b8dce71cc81246045`)
      .then(res=>{
        setMoviedata({...movieData,...res.data})
       
      })
      .catch(err=>console.log(err))
    },[])
  return (
    <div>
     <CustomCard movieId={movieData.id} isFavorite={favoriteMovies.get(movieData.id)?true:false} cardTitle={movieData.original_title} overview={movieData.overview} poster_path={movieData.poster_path} />
    </div>
  )
}

export default Movie
