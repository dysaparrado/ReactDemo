import React, { Component } from 'react';

import './App.css';

const axios = require('axios');

class App extends Component {

  constructor(){
    super();

    this.cargarPersonas = this.cargarPersonas.bind(this);
    this.agregarPersona= this.agregarPersona.bind(this);

    this.proxyurl = "https://cors-anywhere.herokuapp.com/";

    this.state={
      personas :[]
    }

    this.cargarPersonas();
  }

  agregarPersona(event){
    let persona={
      Nombre : event.target.Nombre.value,
      ApPaterno : event.target.ApPaterno.value,
      ApMaterno : event.target.ApMaterno.value,
      Edad : event.target.Edad.value,
      Correo : [{ 
        IdCorreo: 1,
        Dominio: event.target.Dominio.value,
        NombreCorreo: event.target.NombreCorreo.value
      }],
      Telefono: [{
        Codigo: event.target.Codigo.value,
        Lada: event.target.Lada.value,
        Telefono: event.target.Telefono.value,
        Tipo: event.target.Tipo.value
      }]
    };
    axios.post(this.proxyurl+'https://still-dawn-13709.herokuapp.com/api/persona/PostNuevaPersona',persona)
    .then(res => {
      alert(res);
      this.cargarPersonas();
    });
  }

  async cargarPersonas(){
 
    const personas = await axios.get(this.proxyurl+'https://still-dawn-13709.herokuapp.com/api/persona/GetListPersona');
    console.log(personas);
    this.setState({personas : personas.data});
  }

  render() {
    return (
      <div className="App">
      <h1>Personas</h1>
      <h2>Agregar Personas</h2>
      <form onSubmit={this.agregarPersona}>
      <input type="text" placeholder="Nombre" name= "Nombre"></input><br/>
      <input type="text" placeholder="Apellido Paterno" name= "ApPaterno"></input><br/>
      <input type="text" placeholder="Apellido Materno" name= "ApMaterno"></input><br/>
      <input type="number" placeholder="Edad" name= "Edad"></input><br/>
      <input type="text" placeholder="N° Telefono" name= "Telefono"></input><br/>
      <input type="text" placeholder="Lada" name= "Lada"></input><br/>
      <input type="text" placeholder="Codigo" name= "Codigo"></input><br/>
      <input type="text" placeholder="Tipo" name= "Tipo"></input><br/>
      <input type="text" placeholder="Nombre de Correo" name= "NombreCorreo"></input><br/>
      <input type="text" placeholder="Dominio" name= "Dominio"></input><br/>
      <button type="submit">Agregar</button>
      </form>
      <hr/>
      <h2>Personas Registradas</h2>
        <ul>
        {
          this.state.personas.map(persona =>{
            return(
              <li key ={persona._id}>
              <strong>Nombre: </strong>{`${persona.Nombre} ${persona.ApPaterno} ${persona.ApMaterno} `}
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;
