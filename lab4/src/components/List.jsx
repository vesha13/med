import React from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { ADD_TO_CHART, REMOVE_FROM_CHART, ADD_USER } from "./actions";
//import addTocChart from "./add";
import axios from "axios";



function List () {
  const [max_pr, setMax_pr] = useState('');
  const [min_pr, setMin_pr] = useState('');
  const [loading,setLoading] = useState(false);
  const [items, setItems] = useState([])


  const dispatch = useDispatch()

  const{
    isSubmitted,
    token,
    username
  } = useSelector((state)=> state.user);


  const{
   value,
    userValue,
    sum
  } = useSelector((state)=> state.item);

  const onChartAdd =(e) =>
  {
    e.preventDefault(); 
    
  }
   
    function getFilter (max_pr, min_pr) {
        if (max_pr && min_pr ) {
            return `?max_pr=${max_pr}&min_pr=${min_pr}`
        }
        if (max_pr) {
            return `?max_pr=${max_pr}`
        }
        if (min_pr) {
            return `?min_pr=${min_pr}`
        }
        return ('')
    }




  useEffect(() => {
    setLoading(true)
    fetch(`http://127.0.0.1:8000/stock/${getFilter(max_pr, min_pr)}`, {
      method: "GET"})
        .then(response => response.json())
        .then((result) => {
          setItems(result);
            console.log(result);
        })
        setLoading(false)
  }, [max_pr, min_pr]);





  const onLogOut  = (e) => {
    e.preventDefault()
    dispatch({
    type:ADD_USER,
     payload: {username:'',token:''}
    })

}

if (token==='ca7cb8c552a3ae9cf4f379092522f6ccdf622c84'){
return(
  
  <div> {console.log(token)}<Navigate to="/admin" /></div>
)}
    else

  return (

    <div onSubmit={onChartAdd}>
     {isSubmitted  ? <div className='top'>
    <NavLink to="/">Главная</NavLink>
   <NavLink to="/search">Поиск</NavLink>
   <NavLink to="/" onClick={(e)=>onLogOut(e)}>Выход</NavLink>
   
     <a href="#" id="main">
        <div id="okno">
        <Link to="/chart">Перейти в корзину</Link>
      {
        userValue.map((item, id) => (
          <div key={id}  >
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
           
          </div>
        ))
      }
   
       
        </div>
    </a>
    <a href="#main">Корзина </a>  
    </div>  : <NavLink to="/auth">Войти</NavLink>}
    <div className='wrap'>
    <ul>
      {
        Object.entries(items).map(([rId,recipe]) => (
         
          <li key={rId}  >
            <Link to={`/${recipe.pk}`}>
              {recipe.name}
            </Link>
            <div>{recipe.price} руб {' '}
            <button 
             onClick={(e) => {
                        dispatch({
                       type:ADD_TO_CHART,
                      payload: recipe
                     });}
            }>+</button>
             <b>{'  '}</b>
             <button
             onClick={(e) => {
                        dispatch({
                       type:REMOVE_FROM_CHART,
                      payload: recipe
                     });}
            }>удалить</button>
            </div>
           
          </li>
        ))
      }
    </ul>
    <div>
      <b>Отфильровать по цене</b>
      <input type='text'
       value={min_pr}
        placeholder='мин цена' 
        onChange={(e)=>setMin_pr(e.currentTarget.value)}
      />
      <input type='text'
       value={max_pr}
        placeholder='макс цена' 
        onChange={(e)=>setMax_pr(e.currentTarget.value)}
      />
    </div>
    </div>
    {console.log(token)}
    
    </div>
  )
}

export default List;