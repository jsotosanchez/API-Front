import React from 'react';
import { useReclamo } from './hooks/useReclamo';

export default function ReclamoPopUp({ match }) {
  const id = match.params.id;
  const reclamo = useReclamo(id);

  return (
    <div className="modal">
      <button className="close">X</button>
      <div className="modal-content">
        {reclamo && (
          <div className="container">
            <section>img</section>
            <section>
              {reclamo.edificio && <h2>Edificio: {reclamo.edificio.nombre}</h2>}
              <p>
                <b>Ubicación: </b>
                {reclamo.ubicacion}
              </p>
              <p>
                <b>Descripción: </b>
                {reclamo.descripcion}
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
