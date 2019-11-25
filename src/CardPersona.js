import React from 'react';
import AdminOnly from './AdminOnly';

export default function CardPersona({ nombre, documento }) {
  return (
    <div>
      <div className="card-no-over">
        <h5>Nombre: {nombre}</h5>
        <AdminOnly>
          <h5>Documento: {documento}</h5>
        </AdminOnly>
      </div>
    </div>
  );
}
