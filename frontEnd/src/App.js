
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NavBar from './components/NavBar/NavBar';
import { Route , BrowserRouter,Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Favorites from './pages/Favorites/Favorites';
import Movies from './pages/Movies/Movies';
import Movie from './pages/Movie/Movie';
import Home from './pages/Home/Home';
import AskForConfirm from './pages/AskForConfirm/AskForConfirm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import logged from './store/actions/logged';
import Footer from './components/Footer/Footer';
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    if(Cookies.get("Authorization"))
      dispatch(logged("Auth"))
  },[])
  return (
    <BrowserRouter className="route">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/askForConfirm' element={<AskForConfirm/>}/>
        <Route path='/movies/:id' element={<Movie/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
