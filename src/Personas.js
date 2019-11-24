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

  return (
    <div>
      <div className="form">
        <div className="form-row">
          <div className="form-group col-3">
            <label className="texto-blanco">
              Documento:
              <input type="text" name="documento" placeholder="DNI1234567" onChange={handleInputDoc} />
            </label>
          </div>
          <div className="form-group col-3">
            <label className="texto-blanco">
              Nombre:
              <input type="text" name="Nombre" placeholder="Pepito Perez" onChange={handleInputNombre} />
            </label>
          </div>

          <button onClick={agregarPersona} className="button">
            Agregar
          </button>
          <button onClick={eliminarPersona} className="button">
            Eliminar
          </button>
        </div>
      </div>
      <ListaPersonas fetchPersonas={fetchPersonas} labelClass="texto-blanco" />
    </div>
  );
}
