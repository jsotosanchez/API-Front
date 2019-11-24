import React, { useState } from 'react';
import { useReclamo } from './hooks/useReclamo';
import { useHistory } from 'react-router-dom';
import AdminOnly from './AdminOnly';

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
  const history = useHistory();
  const reclamo = useReclamo(id);
  // @ts-ignore
  const usuario = reclamo.usuario;
  // @ts-ignore
  const [estado, setEstado] = useState(reclamo.estado);

  const handleInputEstado = event => {
    setEstado(event.target.value);
  };

  const handleClose = event => {
    history.goBack();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleClose} className="close">
          X
        </button>
        {reclamo && (
          <div className="container">
            <section>img</section>
            <section>
              <h2>Estado: {reclamo.estado}</h2>
              {usuario && <h2>Usuario: {usuario.nombre}</h2>}
              <p>
                <b>Ubicación: </b>
                {reclamo.ubicacion}
              </p>
              <p>
                <b>Descripción: </b>
                {reclamo.descripcion}
              </p>
              <AdminOnly>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    actualizarEstado(estado, id);
                  }}
                  className="form"
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
              </AdminOnly>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
