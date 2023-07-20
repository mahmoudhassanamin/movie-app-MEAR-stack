import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import allMovies from '../../store/actions/allMovies';
function NavBar() {
  let allMoviesPage =useSelector((state)=>state.movies)
  const dispatch = useDispatch()
  const getAllMovies = ()=>{
    dispatch(allMovies(allMoviesPage?false:true))
  }

  return (
    <>
      <Navbar bg="danger" data-bs-theme="dark" style={{zIndex:1,position:"sticky",top:0}}>
        <Container>
          <Navbar.Brand><Link className='nav-link' to="/">Home</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link className='nav-link' to="/movies"   onClick={getAllMovies}>Movies</Link></Nav.Link>
            <Nav.Link><Link className='nav-link' to="/favorites">Favorites</Link></Nav.Link>
            <Nav.Link><Link className='nav-link' to="/register">Register</Link></Nav.Link>
            <Nav.Link><Link className='nav-link' to="/login">Login</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
