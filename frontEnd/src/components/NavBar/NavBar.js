import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import allMovies from '../../store/actions/allMovies';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import logged from '../../store/actions/logged';
import clearFavorites from '../../store/actions/clearFavorites';
import "./NavBar.css"
import imgage from "../../assets/letter-m.png"
function NavBar() {
  let allMoviesPage =useSelector((state)=>state.allMovies.movies)
  let userStatus =useSelector((state)=>state.logged.status)

  const dispatch = useDispatch()
  const getAllMovies = ()=>{
    dispatch(allMovies(allMoviesPage?false:true))
  }

  const logout=(e)=>{
    Cookies.remove("Authorization");
    dispatch(logged("unAuth"))
    dispatch(clearFavorites())
  }
  // useEffect(()=>{

  // },[userStatus])
  return (
    <>
      <Navbar bg="danger" data-bs-theme="dark" style={{zIndex:1,position:"sticky",top:0}}>
        <Container>
          <Navbar.Brand><Link className='nav-link' to="/"><img src={imgage} className='homeIcon'/></Link></Navbar.Brand>
          <Nav className="me-auto rightLinks">
            <div className='d-flex'>
            <Nav.Link ><Link className='nav-link' to="/movies"   onClick={getAllMovies}>Movies</Link></Nav.Link>
            
            {userStatus === "Auth" && <Nav.Link><Link className='nav-link' to="/favorites">Favorites</Link></Nav.Link>}
            </div>
            <div className='d-flex'>
            {userStatus === "Auth"?
            <>
              <Nav.Link ><Link className='nav-link ' to="/login" onClick={logout}>log out</Link></Nav.Link>
            </>
            :<>
              <Nav.Link ><Link className='nav-link ' to="/register">Register</Link></Nav.Link>
              <Nav.Link><Link className='nav-link ' to="/login">Login</Link></Nav.Link>
            </>}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
