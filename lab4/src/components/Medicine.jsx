import React from 'react';
import {  NavLink, useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { ADD_TO_CHART, REMOVE_FROM_CHART } from "./actions";

function Medicine () {

  const {rId} = useParams()
  const [item, setItem] = useState([])
 

  const dispatch = useDispatch()
  const{
   value,
    userValue
  } = useSelector((state)=> state.item);

  const onChartAdd =(e) =>
  {
    e.preventDefault(); 
    
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/stock/${rId}/`, {
      method: "GET"})
        .then(response => response.json())
        .then((result) => {
          setItem(result);
            console.log(result);
        })
  
  }, [rId]);

    const onRecipe =(prescript)=>{
      if (prescript ===false)
      return 'Отпускается без рецепта'
      else
      return 'Отпускается строго по рецепту'
    }
  
  return (
    <div onSubmit={onChartAdd}>
    <div>
        <NavLink to="/">Главная</NavLink>
        {' | '}
        <NavLink to={`/${rId}`}>{item.name}</NavLink>
  
      </div>
      <Link to='/chart'> Корзина</Link>
      <br /><br />
      <div> {item.name}{' '}{item.price}{' '}руб
      <button 
             onClick={(e) => {
                        dispatch({
                       type:ADD_TO_CHART,
                      payload: {name: item.name, price: item.price}
                     });}
            }>+</button>
            <b>{'  '}</b>
             <button
             onClick={(e) => {
                        dispatch({
                       type:REMOVE_FROM_CHART,
                      payload: {name: item.name, price: item.price}
                     });}
            }>удалить</button>
            {console.log(userValue)}
      </div>
      <div> Назнначение: {' '}{item.disease}</div>
      <div> {onRecipe(item.prescript)}</div>
    </div>
  )
}

export default Medicine;