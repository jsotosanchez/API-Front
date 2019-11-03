import React from 'react';

export default function CardPersona({ nombre, documento, className }) {
  return (
    <div>
      <div className={className}>
        <h5>Nombre: {nombre}</h5>
        <h5>Documento: {documento}</h5>
      </div>
    </div>
  );
}
