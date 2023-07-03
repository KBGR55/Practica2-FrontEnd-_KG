const URL = "http://localhost:3006/api";
export const InicioSesion = async (data) => {
    const headers = {
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/sesion", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const Marca = async (key) => {
    const cabeceras = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/marcas/num", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}
export const Marcas = async (key) => {
    const cabeceras = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/marcas", {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log(datos);
    return datos;
}

export const AutosCant = async (key) => {
    const cabeceras = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/autos/num", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const Autos = async (key, urls) => {
    const cabeceras = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + urls, {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const GuardarAuto = async (data, key) => {
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/auto/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("GUARDAR =", JSON.stringify(data));
    return datos;
}

export const ModificarAuto = async (key, data) => {
    console.log("Auto ha modifcar ", data);
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

export const ObtenerAuto = async (key, num) => {
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/auto/obtener/" + num, {
        method: "GET",
        headers: headers
    })).json();
    console.log("DATO OBTENIDO =", JSON.stringify(datos));
    return datos;
}

export const ObtenerDatos = async (nroFila) => {
    const datos = await (await fetch(URL + "/auto" + nroFila, {
        method: "GET",
    })).json();
    return datos;
}
export const OrdenIngreso = async (key) => {
    const cabeceras = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + '/ordenIngresos', {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const GuardarOrdenesIngreso = async (data, key) => {
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/ordenIngreso/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("GUARDAR =", JSON.stringify(data));
    return datos;
}
export const ObtenerOrdenIngreso = async (key, num) => {
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/ordenIngreso/obtener/" + num, {
        method: "GET",
        headers: headers
    })).json();
    console.log("DATO OBTENIDO =", JSON.stringify(datos));
    return datos.info[0];
}
export const Repuestos = async (key) => {
    const cabeceras = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + '/repuestos', {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}
export const ObtenerRepuesto = async (key, num) => {
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/repuesto/obtener/" + num, {
        method: "GET",
        headers: headers
    })).json();
    console.log("DATO OBTENIDO =", JSON.stringify(datos));
    return datos.info;
}
export const GuardarDetalleOrdenCompra = async (data, key) => {
    console.log(data);
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    try {
        const datos = await (await fetch(URL + "/detalleOrdenIngreso/guardar", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })).json();
        console.log("GUARDAR =", JSON.stringify(data));
        return datos;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error; // Puedes re-lanzar el error para que la función que llama también lo maneje
    }
}
export const CrearOrdenCompra = async (data, key) => {
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/ordenCompra/crear", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("GUARDAR =", JSON.stringify(data));
    return datos;
}
export const CalcularValores = async (data, key) => {
    const headers = {
        "X-API-TOKEN": key,
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
  
    const datos = await (await fetch(URL + "/ordenCompra/calcularvalores", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("DATOS QUE TRAE AQUI", JSON.stringify(datos));
    return datos;
}