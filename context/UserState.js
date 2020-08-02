import React, { useState } from 'react';
import UserContext from './UserContext';
import clienteAxios from '../config/axios';

const UserState = (props) => {

    const [usuario, setUsuario] = useState({});

    const iniciarSesion = async (datos) => {
        try {
        const respuesta = await clienteAxios.post("/login", datos );
        console.log(respuesta.data);
        if (respuesta.data.ok === true) {
            setUsuario(respuesta.data.usuario)
            return { ok: true };
        }
        } catch (error) {
        console.log("Se ejecuto el error ------------");
        console.log(error);
        }
    }

    const crearCuenta = async (datos) => {
        //Guardar usuario
        try {
        let respuesta = await clienteAxios.post('/usuario', datos);
        console.log(respuesta.data);
        if (respuesta.data.ok === true) {
            setUsuario(respuesta.data.usuario);
            return { ok: true };
        }
        } catch (error) {
            console.log("Se ejecuto el error ------------");
            console.log(error);       
        }
    }
    const cerrarSesion = () => {
        setUsuario({});
    }

    return (
      <UserContext.Provider
        value={{
          //State
          usuario,
          //Funciones
          crearCuenta,
          iniciarSesion,
          cerrarSesion,
        }}
      >
        {props.children}
      </UserContext.Provider>
    );
}
 
export default UserState;
