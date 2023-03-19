import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { ADD_TO_CHART, REMOVE_FROM_CHART, ADD_USER, SELECT, PRODUCT_LIST, USER_LIST} from "./actions";
//import addTocChart from "./add";
import axios from "axios";
import {Button, Navbar, Popover, Nav, Container, Form, Modal} from 'react-bootstrap';



function Admin () {
  const [max_pr, setMax_pr] = useState('');
  const [min_pr, setMin_pr] = useState('');
  const [loading,setLoading] = useState(false);
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('');
  const [InputName, setInputName] = useState('');
  const [InputPrice, setInputPrice] = useState(0);
  const [InputDis, setInputDis] = useState('');
  const [InputPrescr, setInputPrescr] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  const{
    isSubmitted,
    token,
    username
  } = useSelector((state)=> state.user);

  const{
    name,
    price,
    pk,
    prescript,
    disease
  } = useSelector((state)=> state.select);


  const{
   value,
    userValue,
    sum
  } = useSelector((state)=> state.item);
  const{
   list
   } = useSelector((state)=> state.list);

  const onChartAdd =(e) =>
  {
    e.preventDefault(); 
    
  }
   

  const handleClose3 = async ()=> {
    
    const formData = new FormData()
    formData.append('name', InputName)
    formData.append('disease', InputDis)
    formData.append('price', InputPrice)
    formData.append('prescript', InputPrescr)
    
    await axios(`http://127.0.0.1:8000/stock/`, {
        method: 'POST',
        data: formData,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Token "+ token,
        }

    })
    setShow3(false);
}
const handleClose5 = async ()=> {
  setShow4(false);
  await fetch(`http://127.0.0.1:8000/stock/${pk}/`, {
      method: 'DELETE',
      headers:{
          "Authorization": "Token "+token,
      }
  })
  setShow5(false);
}
const handleClose6 = async ()=> {
  setShow5(false);
}

const handleClose4 = async ()=> {
    
    const formData = new FormData()
    formData.append('pk', pk)
    formData.append('name', InputName)
    formData.append('disease', InputDis)
    formData.append('price', InputPrice)
    formData.append('prescript', InputPrescr)
   
    await axios(`http://127.0.0.1:8000/stock/${pk}/`, {
        method: 'PUT',
        data: formData,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Token "+ token,
        }

    })
    setShow4(false)
}

  const onLogOut  = (e) => {
    e.preventDefault()
    dispatch({
    type:ADD_USER,
     payload: {username:'',token:''}
    })
    
}

function getFilter (search) {
    if (search) {
        return `?search2=${search}`
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
}, [search, show4, show3,show5]);


useEffect(() => {
  setLoading(true)
  fetch(`http://127.0.0.1:8000/user/`, {
  method: "GET"})
    .then(response => response.json())
    .then((result) => {
      setUsers(result);
        console.log(result);
        
    })
    setLoading(false)
  }, []);

const handleShow3 = ()=> setShow3(true);
const handleShow4 = (e)=> setShow4(true);
const handleShow5 = (e)=> setShow5(true)

  return (

    <div onSubmit={onChartAdd}>
      
    {token === '' ? <div> <Navigate to="/" /></div> :
   

    <ul>
   <div className='top'>
    <div>Поиск </div>
    <NavLink to="/" onClick={(e)=>onLogOut(e)}>Выход</NavLink>
    <NavLink to="/orders" onClick={(e) => {
              dispatch({
             type:PRODUCT_LIST,
            payload:  Object.entries(items).map((recipe)=> recipe)
           }) 
           dispatch({
            type:USER_LIST,
           payload:  Object.entries(users).map((user)=> user)
          })
           }}>Заказы</NavLink>
    </div>
    <input type='text' 
        value={search}
        placeholder='товар'
        onChange={(e)=>setSearch(e.currentTarget.value)}
        />
        <button onClick={handleShow3}>Добавить</button>
        <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="text"
                            className="input"
                            
                            placeholder='название'
                            onChange={(e)=>setInputName(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            placeholder='диагноз'
                            onChange={(e)=>setInputDis(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            placeholder="цена"
                            onChange={(e)=>setInputPrice(e.currentTarget.value)}
                        />
                       <Modal.Title>нужен рецепт?</Modal.Title>
                        <Form.Control
                            type="checkbox"
                            className="input"
                           
                            placeholder="рецепт"
                            onChange={(e)=>setInputPrescr(e.currentTarget.value)}
                        />
                        <Form.Group>
                            <Button variant="primary" onClick={handleClose3} 
            >Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
      {
        Object.entries(items).map(([rId,recipe]) => (
         
          <li key={rId}  >
              {recipe.name} 
              <button 
            onClick={(e) => {
              dispatch({
             type:SELECT,
            payload: recipe
           });handleShow4(e)}
  }
   >Изменить</button>
   <button 
            onClick={(e) => {
              dispatch({
             type:SELECT,
            payload: recipe
           });handleShow5(e)}
  }
   >Удалить</button>
            <div>{recipe.price} руб {' '}
            </div>
          </li>
        ))
      }
    </ul>} 
    
  
    <Modal show={show4} onHide={handleClose4}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                      {console.log(pk)}
                        <Form.Control
                            type="text"
                            className="input"
                            
                            placeholder={name}
                            onChange={(e)=>setInputName(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            placeholder={disease}
                            onChange={(e)=>setInputDis(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            placeholder={price}
                            onChange={(e)=>setInputPrice(e.currentTarget.value)}
                        />
                         <Modal.Title>нужен рецепт?</Modal.Title>
                        <Form.Control
                            type="checkbox"
                            className="input"
                            
                            onChange={(e)=>setInputPrescr(e.currentTarget.value)}
                        />
                        <Form.Group>
                            <Button variant="primary" onClick={handleClose4} 
            >Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={show5} onHide={handleClose5}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                         <Modal.Title>Подтвердите удаление товара "{name}"</Modal.Title>
                        <Form.Group>
                            <Button variant="primary" onClick={handleClose5} 
            >Ok</Button>
            <Button variant="primary" onClick={handleClose6} 
            >Отмена</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>         
    </div>
  )
}

export default Admin;