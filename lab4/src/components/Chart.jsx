import React from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { ADD_TO_CHART, REMOVE_FROM_CHART, ADD_USER } from "./actions";
//import addTocChart from "./add";
import axios from "axios";

function Chart () {
  
  const dispatch = useDispatch()
  const{
   value,
    userValue,
    sum,
    name
  } = useSelector((state)=> state.item);
 

  const{
    isSubmitted,
    username,
    token
  } = useSelector((state)=> state.user);

  const onChartAdd =(e) =>
  {
    e.preventDefault(); 
    CheckOut(e)
   
    
  }
   

  const CheckOut=(e)=> {
    const ob = {
        product: name,
        auth_user: username,
        quantity: value,
        price: sum,
        adress: 'не указан',
        status: 'Сформирован'
    }
    console.log(ob)
    fetch("http://127.0.0.1:8000/order/", {
        method: "post",
        headers: {
          "Authorization": "Token "+ token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ob)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        
}



  
if (value!==0){
  return (

    <div onSubmit={onChartAdd}>
      <div className='top'>
    <NavLink to="/">Главная</NavLink>

    </div>
    <div className='wrap'>
    <ul>
      {
        userValue.map((item, id) => (
          <li key={id}  >
              {item.name}{' '}{item.price} руб {' '}
            <div>
            <button 
             onClick={(e) => {
                        dispatch({
                       type:ADD_TO_CHART,
                      payload: item
                     });}
            }>+</button>
             <b>{'  '}</b>
             <button
             onClick={(e) => {
                        dispatch({
                       type:REMOVE_FROM_CHART,
                      payload: item
                     });}
            }>удалить</button>
            </div>
           
          </li>
        ))
      }
    </ul>
    </div>
    <div>Всего товаров: {value}</div>
    <div>Сумма: {sum} {' '} руб</div>
    <button onClick={(e)=> onChartAdd(e)}> Оформить заказ</button>
    </div>
    
  )}

  else {
  return(
    <div>
  <div>Корзина пуста </div>
  <NavLink to="/">Перейти на главную?</NavLink>
  </div>
  )
}
}

export default Chart;