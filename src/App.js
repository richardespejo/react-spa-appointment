import React , { Fragment, useState , useEffect } from 'react';
import './App.css';
import Formulario from './components/formulario.js'; 
import Cita from './components/Cita.js'; 


function App() {

  //verificando en el local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }


  const [citas, guardarCitas] = useState([]);

  //esto es para realizar operaciones cuando el state cambia
  useEffect( () => {
      console.log('listo');
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas))
      }else{
        localStorage.setItem('citas', JSON.stringify([]));
      }
  }, [citas , citasIniciales] );

  //funcion que toma las citas actuales
  const crearCita = cita => {
    console.log(cita);
    guardarCitas([ ...citas, cita ]);
  }

  //function que elimina una cita por id
  const eliminarCita = id =>  {
      const nuevasCitas = citas.filter(cita => cita.id !== id);
      guardarCitas(nuevasCitas); 
  }

  //mensaje condicinal
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Adminisrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              ></Formulario>
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            { citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              ></Cita>
            ))}
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default App;
