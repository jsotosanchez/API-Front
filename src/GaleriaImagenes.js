import React from 'react';

export default function GaleriaImagenes({ imagenes, idReclamo }) {
  return (
    <div>
      <div className="form-row gallery">
        <ul>
          {imagenes.map(i => (
            <li key={i}>
              <img
                src={`http://localhost:8080/reclamos/${idReclamo}/imagenes/${i}`}
                width="200px"
                height="200px"
                alt="imagen reclamo"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
