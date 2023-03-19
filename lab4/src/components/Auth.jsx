import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector} from 'react-redux'
import { ADD_USER } from "./actions";

import { Link, Navigate } from 'react-router-dom';
import axios from "axios";


function Auth (){

  const dispatch = useDispatch()
  const{
    isSubmitted,
    token
  } = useSelector((state)=> state.user);

    const [errorMessages, setErrorMessages] = useState({});
    const [user, setUser] = useState(0); 
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
  );


    async function Authorization1(e){
          const formData = new FormData()
          formData.append('username', username)
          formData.append('password', password)
          console.log(password,username)

          setUsername(JSON.stringify(username));
        // Вызов API login
        e.preventDefault();
        await axios(`http://127.0.0.1:8000/auth/token/login/`, {
          method: 'POST',
          data: formData,
        })
            .then((result) => {
                dispatch({
                  type:ADD_USER,
                  payload: {token: result.data.auth_token, username:username}
                })
                return result;
            })
        .then(async (result) => {
        await axios(`http://127.0.0.1:8000/auth/users/me/`, {
          method: 'GET',
          headers:{
            "Authorization": "Token "+result.data.auth_token,
          }
        })
            .then((result) => {
              setUser(result.data.id);
              console.log(result.data);
              console.log(user);
          })})}

  const errors = {
    pass: "Неверно введен пароль"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      Authorization1(e);

  };
 return(
        <div className="logIN" >
         
           { token !== '' ? 
           <div> <Navigate to="/" /></div>:
          
        <Form className="form" onSubmit={(e) => Authorization1(e)}>
            <Form.Group className="form-body" id='mini'>
              <Form.Group className="header" >Вход</Form.Group>
                <Form.Group className="input">
                    <Form.Control  value ={username} type="text" id="username" className="form__input" name="c" required placeholder="Логин" onChange={(e)=>setUsername(e.currentTarget.value)}/>
                </Form.Group>
                <Form.Group className="input">
                    {renderErrorMessage("pass")}
                    <Form.Control value={password} type="password"  id="password" name="pass" required placeholder="Пароль" onChange={(e)=>setPassword(e.currentTarget.value)}/>
                </Form.Group>
                <Form.Group className="footer">
                  <Link to='/reg'>
                  <Button type="submit" class="btn" id='invite' >Ещё не с нами? Зарегистрироваться!</Button>
                  </Link>
                    <Button onClick={(e)=>handleSubmit(e)} type="submit" class="btn" id='vhod' >Войти</Button>
                </Form.Group>

            </Form.Group>
        </Form>}
        
        </div>
      )     

}
 export default Auth;