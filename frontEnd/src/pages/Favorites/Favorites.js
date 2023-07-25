import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CustomCard from '../../components/CustomCard/CustomCard'

let favoriteMovies
function Favorites() {
  let [favoriteMoviesList,setFavoriteMoviesList]=useState([])
  
  favoriteMovies = useSelector(state=>state.favoriteMovies.favorites)
  let size = useSelector(state=>state.favoriteMovies.size)

  useEffect(()=>{
    let tempMovieList=[]
    
    favoriteMovies.forEach((movieData,movieId)=>{
      tempMovieList.push(<CustomCard  key={movieId} movieId={movieId}  cardTitle={movieData.original_title} overview={movieData.overview} poster_path={movieData.poster_path} />)
    })
    setFavoriteMoviesList([...tempMovieList])
    
    
  },[])
  useEffect(()=>{
    let tempMovieList=[]
    
    favoriteMovies.forEach((movieData,movieId)=>{
      tempMovieList.push(<CustomCard  key={movieId} movieId={movieId} isFavorite={true}  cardTitle={movieData.original_title} overview={movieData.overview} poster_path={movieData.poster_path} />)
    })
    setFavoriteMoviesList([...tempMovieList])
  },[size])
  return (
    <>
      <p className='text-light m-3'>Total Favorite Movies:{size}</p>
      <div className="contain">
        {favoriteMoviesList}
      </div>
    </>
  )
}

export default Favorites
