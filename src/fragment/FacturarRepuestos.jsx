import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { Autos, ObtenerOrdenIngreso, ObtenerRepuesto, Repuestos, GuardarDetalleOrdenCompra,CrearOrdenCompra ,CalcularValores} from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import Footer from "./Footer";
import { useForm } from 'react-hook-form';

export const FacturarRepuestos = () => {
    const { id } = useParams();//el external_id de OrdenIngreso
    const { watch, setValue } = useForm();//para listar repuestos
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ordenIngreso, setOrdenIngreso] = useState([]);
    const [data, setData] = useState([]);//para la tabla de repuestos
    const [carrito, setCarrito] = useState({});//para el carrito a facturar
    const navegation = useNavigate();
    const [llRepuesto, setLlRepuesto] = useState(true);//para listar detalles repuestos
    const [llCarrito, setLlCarrito] = useState(true);//para listar detalles repuestos
    const [repuestosList, setRepuestosList] = useState([]);//para listar autos
    const [llRepuestosList, setllRepuestosList] = useState(false);//para listar autos en el combo
    const [selectedId, setSelectedId] = useState(null);//PARA SACAR EL ID DE LA TABLA
    const [show2, setShow2] = useState(false);//Model Box2
    const handleeClose = () => setShow2(false);//Model Box2
    const handleeShow = () => setShow2(true);//Model Box2
    const handleEliminarAuto = async (id) => {
        const index = data.findIndex((row) => row.id === id);
        if (index !== -1) {
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
            setLlCarrito(false);
        }
    };//para eliminar repuesto de la tabla


    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
        },
        {
            name: 'Marca',
            selector: row => row.marca,
        },
        {
            name: 'Categoria',
            selector: row => row.tipo_categoria,
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad,
        },
        {
            name: 'Precio unitario',
            selector: row => '$ ' + row.costo,
        },
        {
            name: 'Acciones',

            selector: row => (
                <Button variant="btn btn-outline-danger btn-rounded" onClick={() => handleEliminarAuto(row.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </Button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    if (!llRepuestosList) {
        Repuestos(getToken(), '/repuestos').then((info) => {
            if (info.error === true || info.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(info.msg);
                navegation("/sesion");
            } else {
                if (Array.isArray(info.info)) {
                    setRepuestosList(info.info);
                    setllRepuestosList(true);
                } else if (typeof info.info === 'object') {
                    setRepuestosList([info.info]);
                    setllRepuestosList(true);
                } else {
                    console.error("No es un array válido");
                }
            }
        });
    }
    const onSubmit = (external_id) => {
        ObtenerRepuesto(getToken(), external_id.external_id).then((resultado) => {
            const updatedResultado = { ...resultado, cantidad: external_id.cantidad, };
            setData((prevData) => [...prevData, updatedResultado]);
            setLlCarrito(false);
        }).catch((error) => {
            console.error("Error: Obtener datos", error);
        });
    };
    if (!llCarrito) {
        var subTotal = 0;
        for (let i = 0; i < data.length; i++) {
            var cant = Number(data[i].costo) * Number(data[i].cantidad);
            subTotal = Number(subTotal) + Number(cant);
        }
        var iva = Number(subTotal) * 0.12;
        var total = Number(iva) + Number(subTotal);
        const updatedResultado = { subTotal, iva, total };
        setCarrito(updatedResultado);
        setLlCarrito(true);
    }

    const handleFacturar = () => {
        for (let index = 0; index < data.length; index++) {
          var updatedResultado  = {
            "cantidad": data[index].cantidad,
            "external_ordenCompra": id,
            "external_repuesto": data[index].external_id,
          };
          console.log(updatedResultado);
          GuardarDetalleOrdenCompra(updatedResultado, getToken()).then((info) => {
            if (info.code !== 200) {
              mensajes(info.msg, 'error', 'Error');
            } else {
              mensajes(info.msg);
              
            }
          });

        }
        var datos = {
          "external_id": id,
          "subTotal": carrito.subTotal,
          "valorIVA": carrito.iva,
          "total": carrito.total
        };
    
        CalcularValores(datos, getToken()).then((info) => {
          if (info.code !== 200) {
            mensajes(info.msg, 'error', 'Error');
          } else {
            mensajes(info.msg);
            navegation('/ordenIngreso');
          }
        });
      };
      
    //se utiliza el hook useEffect para llamar a GetDatos(nro.nro) una vez cuando el componente se monta.
    useEffect(() => {
        ObtenerOrdenIngreso(getToken(), id).then((resultado) => {
            setOrdenIngreso(resultado);
            setllRepuestosList(false);
            setLlCarrito(false);
            var dat  = {
                "external_ordenIngreso": id,
                "lugar_emision": "local",
              };
           
            CrearOrdenCompra(dat, getToken()).then((info) => {
                if (info.code !== 200) {
                } else {
                }
              });
        }).catch((error) => {
            console.error("Error: Obtener datos a editar", error);
        });
    }, []);
    return (

        <div >
            <div style={{ width: '98%', height: '98%', padding: "25px", margin: '50px auto', padding: '20px', border: ' 1px ', "border-radius": "5px", "text-align": "center" }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h5 className="mb-3">
                                            <a className="text-body">
                                                <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                Detalles orden compra
                                            </a>
                                        </h5>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="row">
                                                <div className="mb-0" style={{ marginTop: '25px', textAlign: 'left' }}>
                                                    <ul className="list-unstyled">
                                                        <li className="text-muted"><span style={{ "color": "#5d9fc5" }}>Cliente:</span> {ordenIngreso.nombres + " " + ordenIngreso.apellidos}</li>
                                                        <li className="text-muted">{ordenIngreso.direccion}</li>
                                                        <li className="text-muted">{ordenIngreso.identificacion}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div>

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
                                                            <RegistrarAuto />
                                                        </Modal.Body>

                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Cerrar
                                                            </Button>

                                                        </Modal.Footer>
                                                    </Modal>



                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p className="mb-0">
                                                    <span className="text-muted">{new Date(ordenIngreso.fecha_ingreso).toLocaleDateString() + " - " + new Date(ordenIngreso.fecha_entrega).toLocaleDateString()}</span>{" "}
                                                </p>
                                                <p className="mb-0">
                                                    <span className="text-muted">#{ordenIngreso.numero_orden_ingreso}</span>{" "}
                                                </p>
                                            </div>

                                        </div>
                                        {/* Tabla de los repuestos */}

                                        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                                            <div className="row">
                                                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
                                                    <div style={{ flex: "75%" }}> {/* ESCOGER AUTO */}
                                                        <select className='form-control' {...register('external_id', { required: true })} value={watch('external_id')} onChange={(e) => setValue('external_id', e.target.value)}>
                                                            <option value="">Elija una repuesto</option>
                                                            {Array.isArray(repuestosList) && repuestosList.map((mar, i) => (
                                                                <option key={i} value={mar.external_id}>
                                                                    {mar.nombre + " - " + mar.marca + " - " + mar.tipo_categoria}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.external_id && errors.external_id.type === 'required' && <div className='alert alert-danger'>Seleccione un repuesto</div>}

                                                        {errors.mar && errors.mar.type === 'required' && <div className='alert alert-danger'>Seleccione un repuesto</div>}
                                                    </div>
                                                    <div style={{ flex: "25%" }} >
                                                        <input type="number" {...register('cantidad', { required: true })} className="form-control form-control-user" placeholder="Cantidad" min="1" max="100" />
                                                        {errors.cantidad && errors.cantidad.type === 'required' && <div className='alert alert-danger'>Selecione la cantidad</div>}
                                                    </div>
                                                    <div style={{ flex: "10%" }}>
                                                        <Button type='submit' variant="primary" style={{ background: "#443C68", "margin-left": "auto" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>



                                            <div className="row ">
                                                <div style={{ color: "#18122B" }}>
                                                    <h2><b>Repuestos</b></h2>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <DataTable
                                                    columns={columns}
                                                    data={data}
                                                />
                                            </div>
                                            <Footer></Footer>
                                        </div>

                                        {/* Resto del contenido del carrito */}
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="card bg-primary text-white rounded-3">
                                            <div className="card-body" style={{ background: '#635985', borderRadius: '5px' }}>
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 className="mb-0">Carrito</h5>
                                                </div>

                                                {/* Resto del contenido del formulario */}

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">${carrito.subTotal}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Iva</p>
                                                    <p className="mb-2">${carrito.iva}</p>
                                                </div>

                                                <div className="d-flex justify-content-between mb-4">
                                                    <p className="mb-2">Total(Incl. taxes)</p>
                                                    <p className="mb-2">${carrito.total}</p>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="btn btn-info btn-block btn-lg" style={{ background: '#393053', border: 'none' }}
                                                >
                                                    <div className="d-flex justify-content-between">
                                                        <span>${carrito.total}</span>
                                                        <span>
                                                            <i className="fas fa-long-arrow-alt-right ms-2" onClick={handleFacturar}>Facturar{" "}</i>
                                                        </span>
                                                    </div>
                                                </button>
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
    );
}


export default FacturarRepuestos;