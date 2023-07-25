import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { moviesAxios } from '../../network/getMovies'
import CustomCard from '../../components/CustomCard/CustomCard'
import { useSelector } from 'react-redux'
import "./Movie.css"
import Card from 'react-bootstrap/Card';
import starImg from "../../assets/star.png"
import plus18 from "../../assets/icons8-18-plus-48.png"
import notPlus18 from "../../assets/icons8-no-one-under-eighteen-emoji-48.png"
function Movie() {
  const { id } = useParams()
  const [movieData, setMoviedata] = useState({})
  let favoriteMovies = useSelector(state => state.favoriteMovies.favorites)
  useEffect(() => {
    moviesAxios.get(`/movie/${id}?api_key=d4441590fcc88a2b8dce71cc81246045`)
      .then(res => {
        setMoviedata(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='d-flex align-items-center m-5 '>
      <CustomCard movieId={movieData.id} isFavorite={favoriteMovies.get(movieData.id)?true:false} cardTitle={movieData.original_title} overview={movieData.overview} showOverview={false} poster_path={movieData.poster_path} />
      <div className='d-flex flex-column align-items-start  customContainer'>
        <h3>Overview</h3>
        <p className='w-100 border-danger border-1 border rounded-2 p-3 fs-5' >{movieData.overview}</p>
        <div className='d-flex justify-content-around w-100'>
          <p className='text-center bg-success fs-5 p-2 rounded-2 h-25 w-50'>Release Date : {movieData.release_date}</p>
          <div className='d-flex flex-column align-items-center' >
          <p className='w-25 text-center bg-warning fs-5 p-2  rounded-2'>{movieData.vote_average} <img src={starImg} className='bg-black rounded-5' width={"15%"}/></p>
          <p className='text-light'>total votes : {movieData.vote_count} </p>
          </div>
          <img width="10%" height="10%" src={movieData.adult?plus18:notPlus18}/>
        </div>

      </div>

    </div>
  )
}

export default Movie
