import React , {Fragment , useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //crear state de citas
    const [cita, actualizarCita] = useState({
        mascota : '',
        propietario : '',
        fecha : '',
        hora : '',
        sintomas : ''
    })

    //crear state de errores
    const [error, actualizaError ] = useState(false);

    //funcion que se ejecuta cada vez que el usuario escribe
    const actualizarState = e => {
        console.log(e.target.name);
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }
    
    //extraer los valores del state
    const {mascota , propietario , fecha , hora , sintomas} = cita;

    //al enviar formulario
    const submitCita = e =>{
        e.preventDefault();
        console.log(e.preventDefault());
        //validar formulario
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizaError(true);
            return;
        }
        //eliminar mensaje del error
        actualizaError(false);
        //asigna un id unico (usa la libreria uuid npm install uuid)
        cita.id = uuid();
        //crear la cita
        crearCita(cita);
        //reiniciar formulario
        actualizarCita({
            mascota : '',
            propietario : '',
            fecha : '',
            hora : '',
            sintomas : ''
        })

    } 

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }
            <form  onSubmit={submitCita}>
                <label>Nombre de Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre del Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Propietario"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />  
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState} 
                    value={hora}                  
                />
                <label>Sintomas</label>
                <textarea 
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    className="u-full-width button-primary"    
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}
export default Formulario;