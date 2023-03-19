import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { ADD_TO_CHART, REMOVE_FROM_CHART, ADD_USER, SELECT, ORDER } from "./actions";
//import addTocChart from "./add";
import axios from "axios";
import {Button, Navbar, Popover, Nav, Container, Form, Modal} from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';


function Orders () {
  const [max_pr, setMax_pr] = useState('');
  const [min_pr, setMin_pr] = useState('');
  const [loading,setLoading] = useState(false);
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('');
  const [InputName, setInputName] = useState('');
  const [InputPrice, setInputPrice] = useState(0);
  const [InputUser, setInputUser] = useState('');
  const [InputQuan, setInputQuan] = useState();
  const [InputAdress, setInputAdress] = useState();
  const [InputStatus, setInputStatus] = useState();
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  //const [pr, setPr] = useState([])

  const dispatch = useDispatch()

  const{
    isSubmitted,
    token,
    username
  } = useSelector((state)=> state.user);

  const{
    product,
    auth_user,
    quantity,
    price,
    pk,
    address,
    status
  } = useSelector((state)=> state.order);


  const{
   value,
    userValue,
    sum
  } = useSelector((state)=> state.item);

  const onChartAdd =(e) =>
  {
    e.preventDefault(); 
    
  }
   

  const handleClose3 = async ()=> {
    
    const formData = new FormData()
    formData.append('product', InputName)
    formData.append('auth_user', InputUser)
    formData.append('quantity', InputQuan)
    formData.append('price', InputPrice)
    formData.append('address', InputAdress)
    formData.append('status', InputStatus)
    setShow3(false);
    await axios(`http://127.0.0.1:8000/chart/`, {
        method: 'POST',
        data: formData,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Token "+ token,
        }

    })
}

const handleClose4 = async ()=> {
    
    const formData = new FormData()
    formData.append('pk', pk)
    formData.append('product', product)
    formData.append('auth_user', auth_user)
    formData.append('quantity', quantity)
    formData.append('price', price)
    formData.append('address', address)
    formData.append('status', InputStatus)
    
    setShow3(false);
    await axios(`http://127.0.0.1:8000/chart/${pk}/`, {
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

const handleClose5 = async ()=> {
    setShow4(false);
    await fetch(`http://127.0.0.1:8000/chart/${pk}/`, {
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

  const onLogOut  = (e) => {
    e.preventDefault()
    dispatch({
    type:ADD_USER,
     payload: {username:'',token:''}
    })
    
}



useEffect(() => {
    setLoading(true)
    fetch(`http://127.0.0.1:8000/chart/`, {
      method: "GET"})
        .then(response => response.json())
        .then((result) => {
          setItems(result);
            console.log(result);
        })
        setLoading(false)
  }, [show3, show4, show5]);

  

  const{
    list,
    } = useSelector((state)=> state.list);
    const{
        userlist,
        } = useSelector((state)=> state.userlist);

const handleShow3 = ()=> setShow3(true);
const handleShow4 = (e)=> setShow4(true);
const handleShow5 = (e)=> setShow5(true)
const statusy = ['сформирован', 'подтвержден', 'оплачен', 'доставлен']
  return (

    <div onSubmit={onChartAdd}>
      
    {token === '' ? <div> <Navigate to="/" /></div> :
   
   
    <ul>
         {console.log(list)}
   <div className='top'>
    <div>Поиск </div>
    <NavLink to="/admin">Товары</NavLink>
    <NavLink to="/" onClick={(e)=>onLogOut(e)}>Выход</NavLink>
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
                    <select value = {InputName} onChange={(e)=> setInputName(e.currentTarget.value)}>
            <option value="pr">Продукт</option>
                { list.map((it,id) =>(
                    <option key = {id} value={it}>{it}</option>
            ))}
        </select>
        <select value = {InputUser} onChange={(e)=> setInputUser(e.currentTarget.value)}>
            <option value="us">Пользователь</option>
                { userlist.map((it,id) =>(
                    <option key = {id} value={it}>{it}</option>
            ))}
        </select>
                        <Form.Control
                            type="text"
                            className="input"
                           
                            placeholder="количество"
                            onChange={(e)=>setInputQuan(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="цена"
                            onChange={(e)=>setInputPrice(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            placeholder="адрес"
                            onChange={(e)=>setInputAdress(e.currentTarget.value)}
                        />
                        <select value = {InputStatus} onChange={(e)=> setInputStatus(e.currentTarget.value)}>
            <option value="pr">Статус</option>
                { statusy.map((it,id) =>(
                    <option key = {id} value={it}>{it}</option>
            ))}
        </select>
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
             {console.log(recipe)}
              пользователь: {recipe.auth_user} {' '} Адресс доставки: {recipe.address} {' '}
              <button 
            onClick={(e) => {
              dispatch({
             type:ORDER,
            payload: recipe
           });handleShow4(e)}
  }
   >Изменить</button>
   <button 
            onClick={(e) => {
              dispatch({
             type:ORDER,
            payload: recipe
           });handleShow5(e)}
  }
   >Удалить</button>
            <div>продукт: {''}{recipe.product};{' '}количество: {' '}{recipe.quantity};{' '}статус:{' '}{recipe.status} {' '}
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
                    <Form.Control
                            type="text"
                            className="input"
                            value={auth_user}
                          
                        />
        <Form.Control
                            type="text"
                            className="input"
                            value={product}
                            
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            value={quantity}
                            
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            value={price}
                            
                        />
                        <Form.Control
                            type="text"
                            className="input"
                           
                            value={address}
                           
                        />
                        <select value = {InputStatus} onChange={(e)=> setInputStatus(e.currentTarget.value)}>
            <option value="pr">Статус</option>
                { statusy.map((it,id) =>(
                    <option key = {id} value={it}>{it}</option>
            ))}
        </select>
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
                         <Modal.Title>Подтвердите удаление заказа пользователя "{auth_user}"</Modal.Title>
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

export default Orders;