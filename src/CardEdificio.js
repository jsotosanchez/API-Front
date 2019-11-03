import React from 'react';

export default function CardEdificio({ nombre, direccion, className }) {
  return (
    <div className={className}>
      <h2>{nombre}</h2>
      <h4>Direccion: {direccion}</h4>
    </div>
  );
}
