import React, { useState } from 'react';
import ListaPersonas from './ListaPersonas';

const fetchPersonas = async () => {
  const data = await fetch(`http://localhost:8080/personas`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

const addPersona = async (doc, nombre) => {
  fetch(`http://localhost:8080/personas/${nombre}/${doc}`, { method: 'POST' });
};
const deletePersona = async doc => {
  fetch(`http://localhost:8080/personas/${doc}`, { method: 'DELETE' });
};

export default function Personas() {
  const [doc, setDoc] = useState('');
  const [nombre, setNombre] = useState('');

  const handleInputDoc = event => setDoc(event.target.value);
  const handleInputNombre = event => setNombre(event.target.value);

  const agregarPersona = event => {
    addPersona(doc, nombre);
  };
  const eliminarPersona = event => {
    deletePersona(doc);
  };

  const buttonStyle = {
    margin: '0px 10px 0px 10px'
  };

  return (
    <div>
      <label>
        Documento:
        <input type="text" name="documento" placeholder="DNI1234567" onChange={handleInputDoc} />
      </label>
      <label>
        Nombre:
        <input type="text" name="Nombre" placeholder="Pepito Perez" onChange={handleInputNombre} />
      </label>
      <button onClick={agregarPersona} className="button">
        Agregar
      </button>
      <button style={buttonStyle} onClick={eliminarPersona} className="button">
        Eliminar
      </button>
      <ListaPersonas fetchPersonas={fetchPersonas} />
    </div>
  );
}
