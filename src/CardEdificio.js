import React from 'react';
import { Link } from 'react-router-dom';

export default function CardEdificio({ id, nombre, direccion, className }) {
  return (
    <div className={className}>
      <h2>{nombre}</h2>
      <h4>Direccion: {direccion}</h4>
      <button>
        <Link to={`detalleEdificio/${id}`}>Ver unidades</Link>
      </button>
    </div>
  );
}
