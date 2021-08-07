import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [nombre, setNombre] = useState(0);
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState(0);
  const [tipoTransaccion, setTipoTransaccion] = useState('');
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
    'Access-Control-Allow-Methods' :'GET, POST, OPTIONS, PUT, DELETE'
  }

  const [lista, setLista] = useState([]);

  const addCliente = () =>{
    Axios.post('http://localhost:8082/usuarios/', {
      apellido, 
      email, 
      tipoTransaccion, 
      nombre
    }, {
      headers: headers
    }).then((response)=>{
      console.log('respuesta: ', response.data[0]);
    });
  }

  const getClientes = () => {
    Axios.get('http://localhost:8082/usuarios',  {
      headers: headers
    }).then((response)=>{
      console.log('respuesta: ', response);
      setLista(response.data);
    });
  }

  return (
    <div className="App">
      <div className="information">
      <label>Nombre</label>
      <input type="numer" onChange ={(event)=> 
        {setNombre(event.target.value)}} 
        />

      <label>Apellido</label>
      <input type="text"  onChange ={(event)=> 
        {setApellido(event.target.value)}} 
        />

      <label>Email</label>
      <input type="numer"  onChange ={(event)=> 
        {setEmail(event.target.value)}} 
        />

      <button onClick={addCliente}>Ingresar</button>
      </div>
      <div className="listaTransacciones">
        <button onClick={getClientes}>Listar Clientes</button>
        {lista.map((val, key)=>{
          return <div className='lista'>
            <h3>Nombre: {val.nombre}</h3>
            <h3>apellido: {val.apellido}</h3>
            <h3>email: {val.email}</h3>
            </div>
        })}
      </div>
      <hr />

    </div>
  );
}

export default App;
