import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useReclamo } from './hooks/useReclamo';
import { useImagenes } from './hooks/useImagenes';
import AdminOnly from './AdminOnly';
import { usePostConToast } from './hooks/useHttp';

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
  const post = usePostConToast();
  const imagenes = useImagenes(id);

  // @ts-ignore
  const usuario = reclamo.usuario;
  // @ts-ignore
  const [estado, setEstado] = useState(reclamo.estado);

  /**@type {React.MutableRefObject<HTMLInputElement | {files: [any]}>} */
  const imageRef = useRef();

  /**
   *
   * @type import('react').MouseEventHandler
   */
  const handleAgregarImagen = event => {
    event.preventDefault();
    const files = Array.from(imageRef.current.files);
    const formData = new FormData();
    formData.append('file', files[0]);

    post(`http://localhost:8080/reclamos/${id}/imagenes`, formData).catch(() => {});
  };

  const handleInputEstado = event => {
    setEstado(event.target.value);
  };

  const handleClose = event => {
    history.goBack();
  };

  const paddinLeft = {
    paddingLeft: '2em'
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleClose} className="close">
          X
        </button>
        {reclamo && (
          <div className="reclamoPopUp-container">
            <section>
              <div className="form-row">
                <div className="col-4">
                  <h2>Estado: {reclamo.estado}</h2>
                </div>
                <div style={paddinLeft} className="col-4">
                  {usuario && <h2>Usuario: {usuario.nombre}</h2>}
                </div>
              </div>
              <div className="form-row">
                <div className="col-4">
                  <p>
                    <b>Ubicación: </b>
                    {reclamo.ubicacion}
                  </p>
                </div>
                <div style={paddinLeft} className="col-6">
                  <p>
                    <b>Descripción: </b>
                    {reclamo.descripcion}
                  </p>
                </div>
              </div>
              <div className="form-row">
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
                    <input type="file" id="image" accept="image/*" ref={imageRef} />
                    <button className="button" onClick={handleAgregarImagen}>
                      Agregar Imagen
                    </button>
                  </form>
                </AdminOnly>
              </div>
            </section>
            <section className="container-row">
              {imagenes.map(i => (
                <div>{i.numero}</div>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
