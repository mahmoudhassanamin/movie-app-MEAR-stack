
import Card from 'react-bootstrap/Card';
import "./CustomCard.css"
import { useSelector,useDispatch } from 'react-redux';
import {addFavoriteMovies,removeFavoriteMovies} from '../../store/actions/addFavoriteMovies';
import { useNavigate } from 'react-router-dom';
import { backEndInstance } from '../../network/backEnd'; 
import Cookies from 'js-cookie';
import logged from '../../store/actions/logged';
import { useState } from 'react';
function CustomCard({ movieId,cardTitle, overview, poster_path ,isFavorite ,showOverview=true}) {
  const dispatch = useDispatch()
  const userStatus= useSelector(state=>state.logged.status)
  const navigate =useNavigate()
  const [error,setError]=useState(false)
  const getMovieById = (id) => {
    navigate(`/movies/${id}`)
  }
  const addAndRemoveFavorites = (e,movieId)=>{
    /**
     * when click send request to add or remove the favorite movie 
     * 
     * 
     */
    e.stopPropagation();
    backEndInstance.post("/movies/addRemoveFavorites",{movieId,cardTitle, overview, poster_path})
    .then(res=>{
      setError(false)
    if(e.target.src === "https://cdn-icons-png.flaticon.com/128/4034/4034436.png") { 
      isFavorite = true;
      e.target.src ="https://cdn-icons-png.flaticon.com/512/3935/3935793.png"}
    else{
      isFavorite = false;
      e.target.src ="https://cdn-icons-png.flaticon.com/128/4034/4034436.png"
    }
    if(res.data.msg === "movie is deleted from the favorites"){
      dispatch(removeFavoriteMovies({movieId,cardTitle,overview,poster_path}))
    }else{
      dispatch(addFavoriteMovies({movieId,cardTitle,overview,poster_path}))
    }
    })
    .catch(err=>{
      if(err.response){
        const {error} = err.response.data
      }
      if(error === "invalid jwt"){
        Cookies.remove("Authorization")
        dispatch(logged("unAuth"))
        navigate("/login")
      }
      else if (error === "jwt must be provided"){
        dispatch(logged("unAuth"))
        navigate("/login")
      }else{
        setError(true)
      }
    })
    
     
  }
  return (
    
    <Card style={{ width: '18rem' }}  className="card" onClick={e=>getMovieById(movieId)} >
      {error && <p className='text-danger'>try again leter</p>}
      {userStatus==="Auth" &&<img className='addToFavorite' key = {movieId} src={isFavorite?"https://cdn-icons-png.flaticon.com/512/3935/3935793.png":"https://cdn-icons-png.flaticon.com/128/4034/4034436.png"} onClick={e=>addAndRemoveFavorites(e,movieId)}/>}
      
        <Card.Img variant="top" alt = "error" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
      
        <Card.Title  className='cardTitle'>{cardTitle}</Card.Title>
        {showOverview && 
          <div className='cardText'>
            <Card.Text className='cardText'>
              <p>{cardTitle}</p>
              {overview}
            </Card.Text>
          </div>
        }

    </Card>
  )
}

export default CustomCard
