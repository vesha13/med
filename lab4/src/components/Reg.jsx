import React from "react";
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//import "bootstrap/dist/css/bootstrap.min.css"
import {Link, NavLink, Navigate } from 'react-router-dom';
//import { Redirect } from "react-router";
import axios from "axios";

function Reg (){
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [username, setUsername]=useState('');
    const [test,setTest] = useState(0);
    const [isReg, setIsReg] = useState(false);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "username"){
            setUsername(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    async function SignUp(e){
         const formData = new FormData()
         formData.append('username', username)
         formData.append('password', password)
         formData.append('email', email)
         console.log(1212)
         // Вызов API login
         e.preventDefault();
              await axios(`http://127.0.0.1:8000/auth/users/`, {
                  method: 'POST',
                  data: formData,
              })
                  .then((result) => {
                      setTest(result.data.id);
                      console.log(result.data.id);
                      setIsReg(true)
                 })


    };
    const handleSubmit  = (e) => {
        e.preventDefault()
        SignUp(e)
    }

    return(
        <div className="logIN">
            { isReg ? <div>User is successfully logged in<Navigate to="/auth" /></div> :
        <Form className="form" onSubmit={(e) => SignUp(e)}>
            
            <Form.Group className="form-body">
                <Form.Group className="header">Регистрация</Form.Group>
                <Form.Group className="name">
                    <Form.Control  type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="Имя"/>
                    <Form.Control  type="text" name="" id="lastName" value={lastName}   onChange = {(e) => handleInputChange(e)} placeholder="Фамилия"/>
                </Form.Group>
                <Form.Group className="input">
                    <Form.Control  type="text" id="username"  value={username} onChange = {(e) => handleInputChange(e)} placeholder="Логин"/>
                </Form.Group>
                <Form.Group className="input">
                    <Form.Control type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Пароль"/>
                </Form.Group>
                <Form.Group className="input">

                    <Form.Control type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Подвтердите пароль"/>
                </Form.Group>
                <Form.Group class="footer">
                    <Link to="/auth">
                        <Button  type="submit" className="btn" id ='enter'>Войти</Button>
                    </Link>
                    <Link  to="/a">
                    <Button className="btn_sign" id='log' onClick={(e)=>{ if(firstName=== null|| lastName===null||password===null||confirmPassword===null) alert('Заполните все  поля'); else if((password!==confirmPassword))alert('Пароли не совпадают:('); else handleSubmit(e)}} type="submit" class="btn">Зарегистрироваться</Button>
                    </Link>
                </Form.Group>
            </Form.Group>
            
        </Form>}
    </div>
    )     

}
 export default Reg;