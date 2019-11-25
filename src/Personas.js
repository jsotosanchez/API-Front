import React, { useState } from 'react';
import { usePostConToast, useDeleteConToast } from './hooks/useHttp';
import { useFiltrarPersonas } from './hooks/usePersonas';

import ListaPersonas from './ListaPersonas';

export default function Personas() {
  const [documento, setDoc] = useState('');
  const [nombre, setNombre] = useState('');
  const [filtro, setFiltro] = useState('');
  const [refresh, setRefresh] = useState(0);
  const post = usePostConToast();
  const deleteConToast = useDeleteConToast();

  const personas = useFiltrarPersonas(filtro, refresh);

  const handleInputDoc = event => setDoc(event.target.value);
  const handleInputNombre = event => setNombre(event.target.value);

  const agregarPersona = event => {
    post(`http://localhost:8080/personas/agregarPersona`, { nombre, documento })
      .then(() => {
        setRefresh(refresh + 1);
      })
      .catch(() => {});
  };

  const eliminarPersona = event => {
    deleteConToast(`http://localhost:8080/personas/${documento}`, {}).catch(() => {});
  };

  const inputStyle = {
    marginLeft: '15px'
  };

  return (
    <div>
      <div className="form">
        <div className="form-row">
          <div className="form-group col-3">
            <label className="texto-blanco">
              Documento:
              <input
                style={inputStyle}
                type="text"
                name="documento"
                placeholder="DNI1234567"
                onChange={handleInputDoc}
              />
            </label>
          </div>
          <div className="form-group col-3">
            <label className="texto-blanco">
              Nombre:
              <input
                style={inputStyle}
                type="text"
                name="Nombre"
                placeholder="Pepito Perez"
                onChange={handleInputNombre}
              />
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
      <ListaPersonas personas={personas} setFiltro={setFiltro} labelClass="texto-blanco" />
    </div>
  );
}
