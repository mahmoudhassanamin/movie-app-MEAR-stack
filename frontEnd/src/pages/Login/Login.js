import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import './Login.css'
function Login() {
  const [userData,setUserData]=useState({email:null,password:null})
  const [userDataErr,setUserDataErr]=useState({emailErr:"",passwordErr:""})
  const [passwordVisablity,setPasswordVisablity]=useState(false)
  const emailRegex = new RegExp(/^\S+@\S+\.\S+$/,"g");
  const tracker = (e)=>{
    if(e.target.name === "email"){
      setUserData({...userData,email:e.target.value})
      setUserDataErr({...userDataErr,emailErr:
        e.target.value === ""?"field is required":
        !emailRegex.test(e.target.value)?"invalid email ex:mahmoud@gmail.com":null})
        
    }
    else if(e.target.name === "password"){
      setUserData({...userData,password:e.target.value})
      setUserDataErr({...userDataErr,passwordErr:
        e.target.value === ""?"field is required":
        e.target.value.length <5?"minimum legth is 5" :null})
    }
  }
 
  const submitHandler=(e)=>{
    e.preventDefault()

  }
  const togglePassword=(e)=>{
    if(passwordVisablity){
      e.target.innerHtml="show password"
      setPasswordVisablity(false)
     
    }else{
      e.target.innerHtml="hide password"
      setPasswordVisablity(true)
    }
    
  }
  return (
    <Form onSubmit={submitHandler} className='container p-5 width'>
      <Form.Group className="mb-3" controlId="formBasicLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          className={userDataErr.emailErr?"border-danger":""} 
          type="email" 
          placeholder="Enter email" 
          onChange={(e)=>tracker(e)} 
          onBlur={(e)=>tracker(e)} 
          name="email"
          />
        <div className='text-danger'>
          {userDataErr.emailErr}
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type={passwordVisablity?"text":"password"} 
          placeholder="Password"
          className={userDataErr.passwordErr?"border-danger":""} 
          onChange={(e)=>tracker(e)} 
          onBlur={(e)=>tracker(e)} 
          name="password"
          />
          <div className='text-danger'>
          {userDataErr.passwordErr}
        </div>
        <button onClick={(e)=>togglePassword(e)} className='btn btn-danger'>show password</button>
      </Form.Group>
      <Button className="btn-danger" variant="primary" type="submit" disabled={userDataErr.emailErr || userDataErr.passwordErr || !userData.email || !userData.password}>
        Submit
      </Button>
    </Form>
  )
}

export default Login
