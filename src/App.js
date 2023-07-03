import React from 'react';
import './App.css';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Sesion from './fragment/Sesion';
import Inicio from './fragment/Inicio';
import Principal from './fragment/Principal';
import PresentarAuto, { Prueba } from './fragment/PresentarAuto';
import { estaSesion } from './utilidades/Sessionutil';
import Actualizar from './fragment/Actualizar';
import PresentarOrdenIngreso from './fragment/PresentarOrdenIngreso';
import FacturarRepuestos from './fragment/FacturarRepuestos';
function App() {
  const Middeware = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return children;
    }else{
      return <Navigate to= '/sesion' state={location}/>;
    }
  }


  const MiddewareSesion = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return <Navigate to= '/inicio'/>;
    }else{
      return children;
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Principal/>}/>
        <Route path='/sesion' element={<Sesion/>}/>
        <Route path='/inicio' element={<Middeware><Inicio/></Middeware>}/>
        <Route path='/autos' element={<Prueba/>}/>
        <Route path='/autoss' element={<Actualizar/>}/>
        <Route path='/ordenIngreso' element={<PresentarOrdenIngreso/>}/>
        <Route path="/facturarRepuestos/:id"  element={<FacturarRepuestos/>}/>
       
      </Routes>
      </div>
  );
}

export default App;
