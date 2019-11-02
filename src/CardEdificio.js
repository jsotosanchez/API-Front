import React from 'react';
import { Link } from 'react-router-dom';

export default function CardEdificio({ id, nombre, direccion }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <h4>{direccion}</h4>
      <button>
        <Link to={`detalleEdificio/${id}`}>Ver unidades</Link>
      </button>
    </div>
  );
}
