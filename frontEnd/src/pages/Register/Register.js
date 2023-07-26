import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Register.css"
import {backEndInstance} from '../../network/backEnd';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [registerData, setRegisterData] = useState({
        fullName: "", email: "", userName: "", password: "", confirmPassword: ""
    })
    const [registerDataErr, setRegisterDataErr] = useState({
        fullNameErr: "", emailErr: "", usernameErr: "", passwordErr: "", confirmPasswordErr: ""
    })
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/,"g");
    const navigate = useNavigate()
    const changeRegisterData = (e) => {
        console.log(registerData)
        switch (e.target.name) {
            case "fullName":
                setRegisterData({ ...registerData, fullName: e.target.value });
                setRegisterDataErr({...registerDataErr,fullNameErr:e.target.value.length === 0?"field is require":e.target.value.length <5?"min length is 5 ":null})
                break
            case "email":
                setRegisterData({ ...registerData, email: e.target.value });
                setRegisterDataErr({...registerDataErr,emailErr:e.target.value.length === 0 ?"field is require":!emailRegex.test(e.target.value)?"invalid email ex:mahmoud@gmail.com":null})
                break
            case "username":
                setRegisterData({ ...registerData, userName: e.target.value });
                setRegisterDataErr({...registerDataErr,usernameErr:!/^[a-zA-z0-9]+$/g.test(e.target.value)?"only small and capital and numbers allowed":e.target.value.length <8?"minimum length is 8":null})
                break
            case "password":
                setRegisterData({ ...registerData, password: e.target.value });
                setRegisterDataErr({...registerDataErr,passwordErr:!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#])[A-Za-z\d*@%$#]{8,}$/g.test(e.target.value)?"invalid password must contain\n -min length is 8\n \
-contain at least one lower case letter\n \
-contain at least one upper case letter \n \
-contain at least one digit\n \
-contain at least one special charecter (*@%$#)":null
            })
                break
            case "confirmPassword":
                setRegisterData({ ...registerData, confirmPassword: e.target.value });
                setRegisterDataErr({...registerDataErr,confirmPasswordErr:registerData.password !== e.target.value?"password not equal confirm password":null})
                break
        }
      
       
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        backEndInstance.post("/user/register",registerData)
        .then(res=>{
            navigate("/askForConfirm")
        })
        .catch(err=>{
             const {error} = err?.response.data
             if(error === "email must be unique"){
                setRegisterDataErr({...registerDataErr,emailErr:"email is used from another user"})
             }
             else if(error === "password and confirm password is not equivalent"){
                setRegisterDataErr({...registerDataErr,confirmPasswordErr:"password not equal confirm password"})
             }
             else if(error === "internal server error"){
                // because the confirmPasswordErr is the last input of the form so the error appears at the bottom
                setRegisterDataErr({...registerDataErr,confirmPasswordErr:"the server has an error please try later"})
             }
             else if(error === "username must be unique"){
                // because the confirmPasswordErr is the last input of the form so the error appears at the bottom
                setRegisterDataErr({...registerDataErr,usernameErr:"username is used from another user"})
             }
             else if(error === "invalid inputs"){
                // because the confirmPasswordErr is the last input of the form so the error appears at the bottom
                setRegisterDataErr({...registerDataErr,confirmPasswordErr:"please enter valid values"})
             }
        })
      }
    return (
        <Form onSubmit={submitHandler} className='p-5 width d-flex flex-column rounded-4'>

            <Form.Group className="mb-3 " controlId="formBasicFullName">

                <Form.Label >Full Name</Form.Label>

                <Form.Control  type="text" placeholder="Enter your Full name" name="fullName" onBlur={(e)=>changeRegisterData(e)} />
                <div className='text-danger'>
                    {registerDataErr.fullNameErr}
                </div>
               
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" onBlur={changeRegisterData} />
                <div className='text-danger'>
                    {registerDataErr.emailErr}
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" name="username" onBlur={changeRegisterData} />
                <div className='text-danger'>
                    {registerDataErr.usernameErr}
                </div>
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onBlur={changeRegisterData} />
                <pre className='text-danger'>
                    {registerDataErr.passwordErr}
                </pre>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="confirmPassword" onBlur={changeRegisterData} />
                <div className='text-danger'>
                    {registerDataErr.confirmPasswordErr}
                </div>
            </Form.Group>

            <Button className="btn-danger" variant="primary" type="submit" disabled={!(registerDataErr.usernameErr === null&&registerDataErr.passwordErr === null&&registerDataErr.fullNameErr === null&&registerDataErr.emailErr === null&&registerDataErr.confirmPasswordErr === null)} >
                Register
            </Button>
        </Form>
    )
}

export default Register




