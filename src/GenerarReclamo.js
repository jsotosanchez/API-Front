import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useEdificios } from './hooks/useEdificios';

const generarReclamo = (edificio, documento, piso, numero, ubicacion, descripcion) => {
  console.log('codigo', edificio);
  console.log('documento', documento);
  console.log('piso', piso);
  console.log('numero', numero);
  console.log('ubicacion', ubicacion);
  console.log('descripcion', descripcion);
  fetch(`http://localhost:8080/reclamos/${edificio}/${piso}/${numero}/${documento}/${ubicacion}/${descripcion}`, {
    method: 'POST'
  });
  alert('se genero!');
};

const buttonStyle = {
  marginLeft: '0px'
};

export default function GenerarReclamo() {
  const history = useHistory();
  const edificios = useEdificios();

  const [edificio, setEdificio] = useState(1);
  const [documento, setDocumento] = useState('');
  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSelect = event => {
    setEdificio(event.target.value);
  };

  const handleDocumento = event => setDocumento(event.target.value);
  const handlePiso = event => setPiso(event.target.value);
  const handleNumero = event => setNumero(event.target.value);
  const handleUbicacion = event => setUbicacion(event.target.value);
  const handleDescripcion = event => setDescripcion(event.target.value);

  const handleClose = event => {
    history.goBack();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleClose} className="close">
          X
        </button>
        <form
          className="form"
          onSubmit={event => {
            event.preventDefault();
            generarReclamo(edificio, documento, piso, numero, ubicacion, descripcion);
          }}
        >
          <div className="form-row">
            <div className="form-group">
              <label>
                Documento:
                <input
                  className="form-control"
                  type="text"
                  name="documento"
                  placeholder="DNI12345"
                  onChange={handleDocumento}
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            {edificios && (
              <div className="form-group col-4">
                <label>
                  Edificio:
                  <select className="form-control" onChange={handleSelect}>
                    {edificios.map(e => (
                      <option value={e.codigo} key={e.codigo}>
                        {e.nombre}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            <div className="form-group col-4">
              <label>
                Piso:
                <input className="form-control" type="number" name="piso" placeholder="1" onChange={handlePiso} />
              </label>
            </div>
            <div className="form-group col-4">
              <label>
                Numero de unidad:
                <input
                  className="form-control"
                  type="number"
                  name="nroUnidad"
                  placeholder="5"
                  onChange={handleNumero}
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-4">
              <label>
                Ubicación:
                <input
                  className="form-control"
                  type="text"
                  name="ubicacion"
                  placeholder="Cocina"
                  onChange={handleUbicacion}
                />
              </label>
            </div>
            <div className="form-group col-8">
              <label>
                Descripción:
                <textarea
                  className="form-control"
                  name="descripcion"
                  placeholder="Hay una gotera"
                  onChange={handleDescripcion}
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <button type="submit" style={buttonStyle} className="button">
              Generar
            </button>
            <button className="button" onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
