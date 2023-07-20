
import Card from 'react-bootstrap/Card';
import "./CustomCard.css"
import { useDispatch,useSelector } from 'react-redux';
import {favoriteMovies} from '../../store/actions/favoriteMovies';
function CustomCard({ movieId,cardTitle, overview, poster_path, onclick ,isFavorite}) {
  const dispatch = useDispatch()
  const addAndRemoveFavorites = (e,movieId)=>{
    e.stopPropagation();
     if(e.target.src === "https://cdn-icons-png.flaticon.com/128/4034/4034436.png") { 
        isFavorite = true;
        e.target.src ="https://cdn-icons-png.flaticon.com/512/3935/3935793.png"}
      else{
        isFavorite = false;
        e.target.src ="https://cdn-icons-png.flaticon.com/128/4034/4034436.png"
      }
    dispatch(favoriteMovies({movieId,cardTitle,overview,poster_path,onclick}))
  }
  return (
    
    <Card style={{ width: '18rem' }}  className="card" onClick={onclick} >
      <img className='addToFavorite' key = {movieId} src={isFavorite?"https://cdn-icons-png.flaticon.com/512/3935/3935793.png":"https://cdn-icons-png.flaticon.com/128/4034/4034436.png"} onClick={e=>addAndRemoveFavorites(e,movieId)}/>
      
        <Card.Img variant="top" alt = "error" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
      
        <Card.Title >{cardTitle}</Card.Title>
        <Card.Text className='cardText'>
          {overview}
        </Card.Text>
      
    </Card>
  )
}

export default CustomCard
