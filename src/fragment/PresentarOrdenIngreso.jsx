import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import EditarAuto from "./EditarAuto";
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import { OrdenIngreso } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import GuardarOrdenIngreso from "./GuardarOrdenIngreso";
import FacturarRepuestos from "./FacturarRepuestos";

export const PresentarOrdenIngreso = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llordenIngresos, setLlordenIngresos] = useState(false);//para listar ordenIngresos
    const actualizar = () => setLlordenIngresos(false);//para listar ordenIngresos
    const [selectedId, setSelectedId] = useState(null);//PARA SACAR EL ID DE LA TABLA
    const [show2, setShow2] = useState(false);//Model Box2
    const handleeClose = () => setShow2(false);//Model Box2
    const handleeShow = () => setShow2(true);//Model Box2
    const handleEditarAuto = async (id) => {
        setSelectedId(id);//Guarda el id en la variable selectedId
        navegation(`/facturarRepuestos/${id}`);
    };//PARA SACAR EL ID DE LA TABLA

    const columns = [
        {
            name: 'Ingreso',
            selector: row => new Date(row.fecha_ingreso).toLocaleDateString(),
        }, {
            name: 'Entrega',
            selector: row =>  new Date(row.fecha_entrega).toLocaleDateString(),
        }, {
            name: 'Cliente',
            selector: row => row.duenio !== 'NO_DATA' ? row.duenio : 'Disponible',
        },
        {
            name: 'Descripcion',
            selector: row => (
                <div style={{ whiteSpace: 'normal', height: 'auto' , textAlign: 'justify' }}>
                    {row.descripcion} || Caracteristicas del auto: {row.placa}, {row.anio}, {row.color}
                </div>
            ),
        },        
        {
            name: 'Acciones',
            selector: row => (<>

                <div >
                    <a href="#" class="btn btn-outline-info btn-rounded" value={selectedId} onClick={() => handleEditarAuto(row.external_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-spreadsheet" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v4h10V2a1 1 0 0 0-1-1H4zm9 6h-3v2h3V7zm0 3h-3v2h3v-2zm0 3h-3v2h2a1 1 0 0 0 1-1v-1zm-4 2v-2H6v2h3zm-4 0v-2H3v1a1 1 0 0 0 1 1h1zm-2-3h2v-2H3v2zm0-3h2V7H3v2zm3-2v2h3V7H6zm3 3H6v2h3v-2z" />
                        </svg>
                    </a>
                </div>

            </>),
        },
    ];
    if (!llordenIngresos) {
        OrdenIngreso(getToken()).then((info) => {
            if (info.error === true || info.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion");
            } else {
                setData(info.info);
            }
        })
        setLlordenIngresos(true);
    }


    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-4 mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow} style={{ background: "#443C68" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Agregar orden ingreso</span>
                        </Button>
                    </div>
                </div>
                <div className="row ">
                    <div style={{ color: "#18122B" }}>
                        <h2><b>Ordenes de Ingresos</b></h2>
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
                            <Modal.Title>Agregar orden ingreso</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <GuardarOrdenIngreso />
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


export default PresentarOrdenIngreso;