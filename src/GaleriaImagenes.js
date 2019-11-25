import React from 'react';

export default function GaleriaImagenes({ imagenes, idReclamo }) {
  return (
    <div>
      <div className="form-row gallery">
        <ul>
          {imagenes.map((u, i) => (
            <li key={i}>
              <img src={`http://localhost:8080/reclamos/${idReclamo}/imagenes/${u}`} alt={`imagen ${i} del reclamo`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
