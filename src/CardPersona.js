import React from 'react';

export default function CardPersona({ nombre, documento }) {
  return (
    <div>
      <div className="card-no-over">
        <h5>Nombre: {nombre}</h5>
        <h5>Documento: {documento}</h5>
      </div>
    </div>
  );
}
