const URL = "http://localhost:3006/api";
export const InicioSesion = async (data) => {
    const headers={
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL+ "/sesion", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const Marca = async (key) => {
    const cabeceras={
        "X-API-TOKEN":key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL+ "/marcas/num", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}
export const Marcas = async (key) => {
    const cabeceras={
        "X-API-TOKEN":key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL+ "/marcas", {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log(datos);
    return datos;
}

export const AutosCant = async(key) => {
    const cabeceras={
        "X-API-TOKEN":key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/autos/num", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const Autos = async (key,urls) => {
    const cabeceras={
        "X-API-TOKEN":key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL+ urls, {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const GuardarAuto = async (data, key) => {
    const headers = {
        "X-API-TOKEN":key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL+ "/auto/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("GUARDAR =", JSON.stringify(data));
    return datos;
}

export const ModificarAuto = async ( key,data) => {
    console.log("Auto ha modifcar ",data);
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key,
        "Accept": 'aplication/json'
    };
    console.log(URL + "/autos/modificar");
    const datos = await (await fetch(URL + "/autos/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("Auto modifcado", datos);
    return datos;
}

export const ObtenerAuto= async(key,num)=>{
    const headers = {
        "X-API-TOKEN":key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL+ "/auto/obtener/"+num, {
        method: "GET",
        headers: headers
    })).json();
    console.log("DATO OBTENIDO =", JSON.stringify(datos));
    return datos;
}

export const ObtenerDatos = async(nroFila)=>{
    const datos = await (await fetch(URL + "/auto" + nroFila, {
        method: "GET",
    })).json();
    return datos;
}
