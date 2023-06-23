import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Marcas, GuardarAuto } from '../hooks/Conexion';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';



export const RegistrarAuto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navegation = useNavigate();
  const [marcas, setMarcas] = useState([]);//para listar marcas
  const [llmarcas, setLlmarcas] = useState(false);//para listar marcas
  const { watch, setValue } = useForm();//para listar marcas

  //acciones
  // onsubmit
  const onSubmit = (data) => {
    var datos = {
      "anio": data.anio,
      "external_marca": data.marca,
      "costo": data.precio,
      "color": data.color,
      "placa": data.placa
    };
    GuardarAuto(datos, getToken()).then((info) => {
      console.log(datos);
      if (info.error === true) {
        mensajes(info.msg, 'error', 'Error');   
        navegation("/autoss");      
      } else {
        mensajes(info.msg);
        navegation("/autoss");  
      }
    }
    );
  };

  if (!llmarcas) {
    Marcas(getToken()).then((info) => {
      if (info.error === true || info.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(info.msg);
        navegation("/sesion");
      } else {
        if (Array.isArray(info.info)) {
          setMarcas(info.info);
          setLlmarcas(true);
        } else if (typeof info.info === 'object') {
          setMarcas([info.info]);
          setLlmarcas(true);
        } else {
          console.error("No es un array válido");
        }
      }
    });
  }
  

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
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese la placa" {...register('placa', { required: true })} />
                    {errors.placa && errors.placa.type === 'required' && <div className='alert alert-danger'>Ingrese una placa</div>}
                  </div>
                  {/** INGRESAR AÑO */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el año" {...register('anio', { required: true })} />
                    {errors.anio && errors.anio.type === 'required' && <div className='alert alert-danger'>Ingrese un anio</div>}
                  </div>

                  {/** ESCOGER COLOR */}
                  <div className="form-group">
                    <input type="text" {...register('color', { required: true })} className="form-control form-control-user" placeholder="Ingrese un color" />
                    {errors.color && errors.color.type === 'required' && <div className='alert alert-danger'>Escriba un color</div>}
                  </div>

                  {/** INGRESAR PRECIO */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el precio" {...register('precio', { required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/ })} />
                    {errors.precio && errors.precio.type === 'required' && <div className='alert alert-danger'>Ingrese el precio</div>}
                    {errors.precio && errors.precio.type === 'pattern' && <div className='alert alert-danger'>Ingrese un precio valido</div>}

                  </div>
                  {/* ESCOGER MARCA */}
                  <div className="form-group">
                    <select className='form-control' {...register('marca', { required: true })} value={watch('marca')} onChange={(e) => setValue('marca', e.target.value)}>
                      <option value="">Elija una marca</option>
                      {Array.isArray(marcas) && marcas.map((mar, i) => (
                        <option key={i} value={mar.external_id}>
                          {mar.nombre + " - " + mar.modelo}
                        </option>
                      ))}
                    </select>
                    {errors.marca && errors.marca.type === 'required' && <div className='alert alert-danger'>Seleccione una marca</div>}
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

                    {/** BOTÓN REGISTRAR */}
                    <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
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
export default RegistrarAuto;