import { useEffect, useState } from "react"
import { moviesAxios } from "../../network/getMovies"
import CustomCard from "../../components/CustomCard/CustomCard"
import "./Movies.css"
import { useLocation, useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent"
import { useSelector,useDispatch } from "react-redux"

let pagesLimit;
let paginationVisable = false;
let results;

function Movies() {
    let allMoviesPage =useSelector((state)=>state.movies)
    let favoriteMovies = useSelector(state=>state.favoriteMovies.favorites)
    const navigate = useNavigate()
    const [movieList, setmovieList] = useState([]);
    const [searchMovie,setSearchMovie]=useState("");
    const [activePage, setActivePage] = useState(1);
    const [searchCondition, setSearchCondition] = useState(false);
    const getMoviePage = (page,search) => {
        results=null
        setActivePage(page);
        let searchURLPath;
        if(search){
            searchURLPath=`/search/movie?api_key=d4441590fcc88a2b8dce71cc81246045&query=${searchMovie}&page=${page}`
        }else{
            searchURLPath=`/movie/popular?api_key=d4441590fcc88a2b8dce71cc81246045&page=${page}`
        }
        moviesAxios.get(searchURLPath)
            .then(res => {
                if(res.data.results.length !== 0){
                    setmovieList(res.data.results);
                    pagesLimit=res.data.total_pages;
                    results=res.data.total_results;
                }else{
                    setmovieList([{original_title:"No results",id:0}]);
                    pagesLimit=0;
                    results=0;
                    paginationVisable=true;
                }
            })
            .catch(err => {
                setmovieList([{original_title:"we are sorry but some error happened",id:0}]);
                paginationVisable=true;
            })
    }
    useEffect(() => {
        setSearchCondition(false)
        getMoviePage(1);
    }, [])
    
    useEffect(()=>{
        setSearchCondition(false)
        getMoviePage(1);
    },[allMoviesPage])

    const getMovieById = (id) => {
        navigate(`/movies/${id}`)
    }

    const getMoviesByName = (e) => {
        e.preventDefault();
        if(searchMovie){
            setSearchCondition(true);
            getMoviePage(1,true);
        }else{
            setSearchCondition(false);
            getMoviePage(1,false);
        }
    }

    return (
        <>
        <div>
        <Form className='d-flex width m-2' onSubmit={getMoviesByName}>
            <Form.Control type="text" placeholder="Search" style={{width:"50%",margin:"0 3%"}} onChange={(e)=>setSearchMovie(e.target.value)}/>
            <Button className="btn-danger" variant="primary" type="submit"  >
                Search
            </Button>
        </Form>
        {
        results&&
        <div className="text-light mx-3">
            results:{results}
        </div>
        }
        </div>
        <div className="contain">
            {
                movieList.length !== 0 ? movieList.map(movie => {
                    return <CustomCard onclick={() => getMovieById(movie.id)} isFavorite={favoriteMovies.get(movie.id)?true:false} key={movie.id} movieId={movie.id}  cardTitle={movie.original_title} overview={movie.overview} poster_path={movie.poster_path} />
                }) : <Spinner />
            }
            
            {movieList.length !== 0 &&
                <div className="paginationPosition" hidden={paginationVisable}>
                    <PaginationComponent getAnotherPage={getMoviePage} searchCondition={searchCondition} activePage={activePage}/>
                <p className="text-light">total pages {pagesLimit}</p>
                </div>
                }
                
        </div>
        </>
    )
}

export default Movies
