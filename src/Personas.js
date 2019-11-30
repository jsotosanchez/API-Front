import React, { useState } from 'react';
import { usePostConToast, useDeleteConToast } from './hooks/useHttp';
import { useFiltrarPersonas } from './hooks/usePersonas';

import ListaPersonas from './ListaPersonas';
import { TIPO_USUARIO } from './SessionContext';

export default function Personas() {
  const [documento, setDoc] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [filtro, setFiltro] = useState('');
  const { personas, refresh } = useFiltrarPersonas(filtro);

  const post = usePostConToast();
  const deleteConToast = useDeleteConToast();

  const handleInputDoc = event => setDoc(event.target.value);
  const handleInputNombre = event => setNombre(event.target.value);
  const handleTipoUsuario = event => setTipoUsuario(event.target.value);

  const agregarPersona = event => {
    post(`http://localhost:8080/personas/agregarPersona`, { nombre, documento, tipo: tipoUsuario })
      .then(refresh)
      .catch(() => {});
  };

  const eliminarPersona = event => {
    deleteConToast(`http://localhost:8080/personas/${documento}`, {})
      .catch(() => {})
      .then(refresh)
      .catch(() => {});
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
          <div className="form-group">
            <label className="texto-blanco">
              Duenio
              <input
                type="radio"
                name="tipoUsuario"
                value={TIPO_USUARIO.DUENIO}
                onChange={handleTipoUsuario}
                checked={tipoUsuario === TIPO_USUARIO.DUENIO}
              />
            </label>
            <label className="texto-blanco">
              Inquilino
              <input
                type="radio"
                name="tipoUsuario"
                value={TIPO_USUARIO.INQUILINO}
                onChange={handleTipoUsuario}
                checked={tipoUsuario === TIPO_USUARIO.INQUILINO}
              />
            </label>
            <label className="texto-blanco">
              Administrador
              <input
                type="radio"
                name="tipoUsuario"
                value={TIPO_USUARIO.ADMINISTRADOR}
                onChange={handleTipoUsuario}
                checked={tipoUsuario === TIPO_USUARIO.ADMINISTRADOR}
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
