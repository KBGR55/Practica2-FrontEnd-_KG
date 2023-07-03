import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { autos, GuardarOrdenesIngreso, Autos } from '../hooks/Conexion';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';

export const GuardarOrdenIngreso = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navegation = useNavigate();
  const [autos, setautos] = useState([]);//para listar autos
  const [llautos, setLlautos] = useState(false);//para listar autos
  const { watch, setValue } = useForm();//para listar autos

  //acciones
  // onsubmit
  const onSubmit = (data) => {
    var datos = {
      "fecha_entrega": data.fecha_entrega,
      "external_auto": data.external_auto,
      "descripcion": data.descripcion,
    };
    GuardarOrdenesIngreso(datos, getToken()).then((info) => {
      console.log(datos);
      if (info.error === true) {
        mensajes(info.msg, 'error', 'Error');
        navegation("/ordenIngreso");
      } else {
        mensajes(info.msg);
        navegation("/ordenIngreso");
      }
    }
    );
  };

  if (!llautos) {
    Autos(getToken(), '/autos/ingresarReparacion').then((info) => {
      if (info.error === true || info.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(info.msg);
        navegation("/sesion");
      } else {
        if (Array.isArray(info.info)) {
          setautos(info.info);
          setLlautos(true);
        } else if (typeof info.info === 'object') {
          setautos([info.info]);
          setLlautos(true);
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
                  {/** INGRESAR FECHA DE ENTREGA */}
                  <div className="form-group">
                    <input type="date" className="form-control form-control-user" {...register('fecha_entrega', { required: true })} />
                    {errors.fecha_entrega && errors.fecha_entrega.type === 'required' && <div className='alert alert-danger'>Ingrese una fecha de entrega</div>}
                  </div>


                  {/** ESCOGER descripcion */}
                  <div className="form-group">
                    <input type="text" {...register('descripcion', { required: true })} className="form-control form-control-user" placeholder="Ingrese una descripcion" />
                    {errors.descripcion && errors.descripcion.type === 'required' && <div className='alert alert-danger'>Escriba una descripcion</div>}
                  </div>


                  {/* ESCOGER AUTO */}
                  <div className="form-group">
                    <select className='form-control' {...register('external_auto', { required: true })} value={watch('external_auto')} onChange={(e) => setValue('external_auto', e.target.value)}>
                      <option value="">Elija una auto</option>
                      {Array.isArray(autos) && autos.map((mar, i) => (
                        <option key={i} value={mar.external_id}>
                          {mar.placa + " - " + mar.anio + " - " + mar.color}
                        </option>
                      ))}
                    </select>
                    {errors.external_auto && errors.external_auto.type === 'required' && <div className='alert alert-danger'>Seleccione un auto</div>}
                  </div>
                  <hr />

                  {/** BOTÓN CANCELAR */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="/ordenIngreso" className="btn btn-danger btn-rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentdescripcion" class="bi bi-x-circle" viewBox="0 0 16 16">
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
export default GuardarOrdenIngreso;