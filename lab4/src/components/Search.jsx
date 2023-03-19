import React from 'react';
import {  NavLink, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'


function Search () {

    
    const [search, setSearch] = useState('');
    //const [search_n, setSearch_n] = useState('');
    const [loading,setLoading] = useState(false);
    const [items, setItems] = useState([])
  
  
    const dispatch = useDispatch()
    const{
     value,
      userValue,
      sum
    } = useSelector((state)=> state.item);
  
    const onChartAdd =(e) =>
    {
      e.preventDefault(); 
      
    }
     
      function getFilter (search) {
          if (search) {
              return `?search=${search}`
          }
          return ('')
      }

  useEffect(() => {
    setLoading(true)
    fetch(`http://127.0.0.1:8000/stock/${getFilter(search)}`, {
      method: "GET"})
        .then(response => response.json())
        .then((result) => {
          setItems(result);
            console.log(result);
        })
        setLoading(false)
  }, [search]);

  return (

    <div onSubmit={onChartAdd}>
      <div className='top'>
    <NavLink to="/">Главная</NavLink>
    <NavLink to="/search">Поиск</NavLink>
    <Link to='/chart'> Корзина</Link>
    </div>
    <div className='wrap'>
    <ul>
        <input type='text' 
        value={search}
        placeholder='диагноз'
        onChange={(e)=>setSearch(e.currentTarget.value)}
        />
      {
        Object.entries(items).map(([rId,recipe]) => (
         
          <li key={rId}  >
            <Link to={`/${recipe.pk}`}>
              {recipe.name} {' '}{recipe.price}руб {' '}
            </Link>
            <div> назначение:{recipe.disease} </div>
           
          </li>
        ))
      }
    </ul>
    </div>
    </div>
  )
}

export default Search;