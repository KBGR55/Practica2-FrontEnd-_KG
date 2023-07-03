import { useNavigate } from 'react-router';
import '../css/stylea.css';
import { AutosCant, Marca} from '../hooks/Conexion';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import Footer from './Footer';
import mensajes from '../utilidades/Mensajes';
import { useState } from 'react';


const Inicio = () => {
    const navegation = useNavigate();
    const [nro, setNro] = useState(0);
    const [nroA, setNroA] = useState(0);
    console.log(getToken());
    Marca(getToken()).then((info) =>{
       // console.log("INFO:",info);
        if(info.error==true && info.messaje == 'Acceso denegado. Token a expirado'){
            borrarSesion();
            mensajes(info.mensajes);
            navegation("/sesion")
        }else{
            setNro(info.info);
        }
    })
    //const autos = Autos(getToken());
    AutosCant(getToken()).then((info) =>{
        if(info.error==true && info.messaje == 'Acceso denegado. Token a expirado'){
            borrarSesion();
            mensajes(info.mensajes);
            navegation("/sesion")
        }else{
            setNroA(info.info);
        }
    })
    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">
                   
                    {/**De aqu'i a abajo el cuerpo*/}
                    <div className='content-fluid'>
                        <div className="row">
                        <h1 className="h3 mb-5 mt-5 text-gray-800">OPCIONES</h1>
                        </div>
                        <div className="row">

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Numero de marcas</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{nro}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Numero de Autos</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{nroA}</div>
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    <a class="text-reset fw-bold" href="/autos">Grud de autos</a>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Mecanica</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{nro}</div>
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    <a class="text-reset fw-bold" href="/ordenIngreso">Orden de ingreso</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Inicio;