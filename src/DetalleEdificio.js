import React from 'react';
import Nav from './Nav';

export default function DetalleEdificio({ id, nombre }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <Nav />
    </div>
  );
}
