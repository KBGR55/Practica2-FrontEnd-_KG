import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import EditarAuto from "./EditarAuto";
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import { Autos } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import Footer from "./Footer";

export const Prueba = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llAutos, setLlAutos] = useState(false);//para listar autos
    const actualizar = () => setLlAutos(false);//para listar autos
    const [llVendidos, setLlVendidos] = useState(false);//para listar vendidos
    const vendidos = () => setLlVendidos(true);//para listar vendidos
    const [llDisponibles, setLlDisponibles] = useState(false);//para listar disponibles
    const disponibles = () => setLlDisponibles(true);//para listar disponibles
    const [selectedId, setSelectedId] = useState(null);//PARA SACAR EL ID DE LA TABLA
    const [show2, setShow2] = useState(false);//Model Box2
    const handleeClose = () => setShow2(false);//Model Box2
    const handleeShow = () => setShow2(true);//Model Box2
    const handleEditarAuto = async (id) => {
        setSelectedId(id);//Guarda el id en la variable selectedId
        handleeShow();//Llama a el model de editar
    };//PARA SACAR EL ID DE LA TABLA

    const columns = [
        {
            name: 'Marca',
            selector: row => row.marca.nombre,
        },
        {
            name: 'Modelo',
            selector: row => row.marca.modelo,
        },
        {
            name: 'Año',
            selector: row => row.anio,
        },
        {
            name: 'Color',
            selector: row => row.color,
        },
        {
            name: 'Placa',
            selector: row => row.placa,
        },
        {
            name: 'Precio',
            selector: row => '$ ' + row.costo,
        },
        {
            name: 'Fafricado',
            selector: row => row.marca.pais,
        },
        {
            name: 'Duenio',
            selector: row => row.duenio !== 'NO_DATA' ? row.duenio : 'Disponible',
        },
        {
            name: 'Acciones',
            selector: row => (<>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="#" class="btn btn-outline-info btn-rounded" value={selectedId} onClick={() => handleEditarAuto(row.external_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </a>
                </div>

            </>),
        },
    ];
    if (!llAutos) {
        Autos(getToken(), '/autos').then((info) => {
            if (info.error === true || info.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion");
            } else {
                setData(info.info);
            }
        })
        setLlAutos(true);
    }
    if (llVendidos) {
        console.log("lol");
        Autos(getToken(), '/autos/vendidos').then((info) => {
            console.log(info);
            if (info.error == true && info.messaje == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion")
            } else {
                setData(info.info);
            }
        })

        setLlVendidos(false);
    }
    if (llDisponibles) {
        Autos(getToken(), '/autos/disponibles').then((info) => {
            console.log(info);
            if (info.error == true && info.messaje == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion")
            } else {
                setData(info.info);
            }
        })

        setLlDisponibles(false);
    }

    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                <div className="col-sm-1 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={actualizar} style={{ background: "#443C68"}}>
                            <span style={{ marginLeft: '5px' }}>Listar</span>
                        </Button>
                    </div>
                    <div className="col-sm-2 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={vendidos} style={{ background: "#443C68"}}>
                            <span style={{ marginLeft: '5px' }}>Autos vendidos</span>
                        </Button>
                    </div>
                    <div className="col-sm-2 offset-sm-1  mt-5 mb-4 text-gred" >
                        <Button variant="primary" onClick={disponibles} style={{ background: "#443C68"}}>
                            <span style={{ marginLeft: '5px' }}>Autos disponibles</span>
                        </Button>
                    </div>
                    <div className="col-sm-2 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}style={{ background: "#443C68"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Agregar Auto</span>
                        </Button>
                    </div>
                </div>
                <div className="row ">
                    <div  style={{ color: "#18122B" }}>
                        <h2><b>Detalles Autos</b></h2>
                        </div>
                </div>
                <div className="row">
                    <DataTable
                        columns={columns}
                        data={data}
                    />

                </div>
                <Footer></Footer>
                
                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar auto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegistrarAuto/>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>



                </div>

                {/* <!--- Model Box2 ---> */}
                <div className="model_box">
                    <Modal
                        show={show2}
                        onHide={handleeClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar auto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditarAuto nro={selectedId} ></EditarAuto>
                            
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleeClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}


export default Prueba;