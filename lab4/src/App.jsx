import { Routes, Route } from "react-router-dom";
import List from "./components/List.jsx"
import Medicine from "./components/Medicine";
import'./App.css'
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Search from "./components/Search"
import Chart from "./components/Chart";
import Reg from "./components/Reg";
import Auth from "./components/Auth";
import Admin from "./components/Admin_List";
import Orders from "./components/Orders";
//import List from "./components/List";
function App() {

  return (
    <BrowserRouter>
    
    <Routes>
    <Route path="/"element ={<List/>}/>
    <Route  path="/:rId" element={ <Medicine/>}/>
    <Route path='/search'  element={ <Search/>}/>
    <Route path='/chart'  element={ <Chart/>}/>
    <Route path='/reg'  element={ <Reg/>}/>
    <Route path='/auth'  element={ <Auth/>}/>
    <Route path="/admin"  element={ <Admin/>}/>
    <Route path="/orders"  element={ <Orders/>}/>
    </Routes>
    
   
   
    </BrowserRouter>

  );
}

export default App;
