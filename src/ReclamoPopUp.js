import React, { useState } from 'react';
import { useReclamo } from './hooks/useReclamo';

/**
 *
 * @param {string} estado
 * @param {number} id
 */
const actualizarEstado = (estado, id) => {
  fetch(`http://localhost:8080/reclamos/${id}/cambiarEstado/${estado}`, {
    method: 'PATCH'
  });
};

export default function ReclamoPopUp({ match }) {
  const id = match.params.id;
  const reclamo = useReclamo(id);
  // @ts-ignore
  const [estado, setEstado] = useState(reclamo.estado);

  const handleInputEstado = event => {
    setEstado(event.target.value);
  };
  return (
    <div className="modal">
      <button className="close">X</button>
      <div className="modal-content">
        {reclamo && (
          <div className="container">
            <section>img</section>
            <section>
              <h2>
                Estado:{' '}
                {
                  // @ts-ignore
                  reclamo.estado
                }
              </h2>
              <p>
                <b>Ubicación: </b>
                {
                  // @ts-ignore
                  reclamo.ubicacion
                }
              </p>
              <p>
                <b>Descripción: </b>
                {
                  // @ts-ignore
                  reclamo.descripcion
                }
              </p>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  actualizarEstado(estado, id);
                }}
              >
                <select onChange={handleInputEstado}>
                  <option value="nuevo">Nuevo</option>
                  <option value="abierto">Abierto</option>
                  <option value="enProceso">En proceso</option>
                  <option value="desestimado">Desestimado</option>
                  <option value="anulado">Anulado</option>
                  <option value="terminado">Terminado</option>
                </select>
                <button type="submit" className="button">
                  Cambiar Estado
                </button>
              </form>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
