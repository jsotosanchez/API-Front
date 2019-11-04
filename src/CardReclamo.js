import React from 'react';

export default function CardReclamo({ nombre, edificio, estado, className }) {
  return (
    <div>
      <div className={className}>
        <h5>Persona: {nombre}</h5>
        <h5>Edificio: {edificio}</h5>
        <h5>Estado: {estado}</h5>
      </div>
    </div>
  );
}
