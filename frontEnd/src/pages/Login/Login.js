import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { backEndInstance } from '../../network/backEnd';
import './Login.css'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logged from '../../store/actions/logged';
import { addFavoriteMovies } from '../../store/actions/addFavoriteMovies';
function Login() {
  const [userData, setUserData] = useState({ email: null, password: null })
  const [userDataErr, setUserDataErr] = useState({ emailErr: "", passwordErr: "" })
  const [passwordVisablity, setPasswordVisablity] = useState(false)
  const emailRegex = new RegExp(/^\S+@\S+\.\S+$/, "g");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const tracker = (e) => {
    if (e.target.name === "email") {
      setUserData({ ...userData, email: e.target.value })
      setUserDataErr({
        ...userDataErr, emailErr:
          e.target.value === "" ? "field is required" :
            !emailRegex.test(e.target.value) ? "invalid email ex:mahmoud@gmail.com" : null
      })

    }
    else if (e.target.name === "password") {
      setUserData({ ...userData, password: e.target.value })
      setUserDataErr({
        ...userDataErr, passwordErr:
          e.target.value === "" ? "field is required" :
            e.target.value.length < 5 ? "minimum legth is 5" : null
      })
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    backEndInstance.post("/user/login", userData)
      .then(res => {
        const jwt = res.headers['authorization'].split(" ")[1];
        let jwtDecoded = jwtDecode(jwt)
        Cookies.set("Authorization", jwt, { expires: new Date(jwtDecoded.exp * 1000) })
        dispatch(logged("Auth"))
        navigate("/")
        return backEndInstance.get("/movies/getAllFavorites")
      })
      .then(res=>{
        console.log(res.data)
        res.data.forEach(movie=>dispatch(addFavoriteMovies({movieId:movie._id.movieId,original_title:movie.cardTitle,overview:movie.overview,poster_path:movie.poster_path})))
      })
      .catch(err => {
        const { error } = err?.response.data
        if (error === "invalid email" || error === "unactive email") {
          setUserDataErr({ ...userDataErr, emailErr: error })
        }
        else if (error === "invalid password") {
          setUserDataErr({ ...userDataErr, passwordErr: "invalid password" })
        } else {
          setUserDataErr({ ...userDataErr, passwordErr: "server is busy try again later" })
        }
      })
  }
  const togglePassword = (e) => {

    if (passwordVisablity) {
      e.target.innerHtml = "show password"
      setPasswordVisablity(false)

    } else {
      e.target.innerHtml = "hide password"
      setPasswordVisablity(true)
    }
  }
  return (
    <Form onSubmit={submitHandler} className='container p-5 width'>
      <Form.Group className="mb-3" controlId="formBasicLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className={userDataErr.emailErr ? "border-danger" : ""}
          type="email"
          placeholder="Enter email"
          onChange={(e) => tracker(e)}
          onBlur={(e) => tracker(e)}
          name="email"
        />
        <div className='text-danger'>
          {userDataErr.emailErr}
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={passwordVisablity ? "text" : "password"}
          placeholder="Password"
          className={userDataErr.passwordErr ? "border-danger" : ""}
          onChange={(e) => tracker(e)}
          onBlur={(e) => tracker(e)}
          name="password"
        />
        <div className='text-danger'>
          {userDataErr.passwordErr}
        </div>
        <button type="button" onClick={togglePassword} className='btn btn-danger'>show password</button>
      </Form.Group>
      <Button className="btn-danger" variant="primary" type="submit" disabled={userDataErr.emailErr || userDataErr.passwordErr || !userData.email || !userData.password}>
        Submit
      </Button>
    </Form>
  )
}

export default Login
