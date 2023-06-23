import React, { useState, useEffect } from 'react';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ModificarAuto, ObtenerAuto,Marcas} from '../hooks/Conexion';
import '../css/style.css';
import '../css/stylea.css';

function EditarAuto(nro) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [validated, setValidated] = useState(false);
  const [a, setA] = useState(null);
  const navegation = useNavigate();

  const onSubmit = (data) => {
 
    var datos = {
      "external_id": a.external_id,
      "anio": data.anio,
      "placa": data.placa,
      "color": data.color,
      "costo": data.costo
    };
    //console.log(a.external_id);
    //console.log(datos);
  
    ModificarAuto(getToken(),datos).then((info) => {
      if (info.code !==200) {
        mensajes(info.msg, 'error', 'Error');
        console.log('Error: Edititando...')
      } else {
        mensajes(info.msg);
        navegation("/autoss");
        console.log('Exito: Edititando')
      }
    });
  };

  //se utiliza el hook useEffect para llamar a GetDatos(nro.nro) una vez cuando el componente se monta.
  useEffect(() => {
    ObtenerAuto(getToken(),nro.nro).then((resultado) => {
      setA(resultado.info);
      console.log(resultado.info);
    }).catch((error) => {
      console.error("Error: Obtener datos a editar", error);
    });
  }, []);
  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">
          <div className='container-fluid'>
            <div className="col-lg-10">
              <div className="p-5">

                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  {/** INGRESAR PLACA */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese la placa" {...register('placa', { required: true })} defaultValue={a && a.placa ? a.placa : ''} />
                    {errors.placa && errors.placa.type === 'required' && <div className='alert alert-danger'>Ingrese una placa</div>}
                  </div>
                  {/** INGRESAR AÑO */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el año" {...register('anio', { required: true })} defaultValue={a && a.anio ? a.anio: ''} />
                    {errors.anio && errors.anio.type === 'required' && <div className='alert alert-danger'>Ingrese un anio</div>}
                  </div>

                  {/** ESCOGER COLOR */}
                  <div className="form-group">
                    <input type="text" {...register('color', { required: true })} className="form-control form-control-user" placeholder="Ingrese un color" defaultValue={a && a.color ? a.color: ''} />
                    {errors.color && errors.color.type === 'required' && <div className='alert alert-danger'>Escriba un color</div>}
                  </div>

                  {/** INGRESAR PRECIO */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el precio" {...register('costo', { required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/ })} defaultValue={a && a.costo ? a.costo: ''} />
                    {errors.costo && errors.costo.type === 'required' && <div className='alert alert-danger'>Ingrese el precio</div>}
                    {errors.costo && errors.costo.type === 'pattern' && <div className='alert alert-danger'>Ingrese un precio valido</div>}

                  </div>
                  <hr />

                  {/** BOTÓN CANCELAR */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="/autos" className="btn btn-danger btn-rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <span style={{ marginLeft: '5px' }}>Cancelar</span>
                    </a>

                    {/** BOTÓN EDITAR */}
                    <input className="btn btn-success btn-rounded" type='submit' value='Editar' >
                      
                    </input>
                  </div>

                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditarAuto;