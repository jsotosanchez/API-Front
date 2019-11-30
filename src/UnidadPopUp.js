import React from 'react';
import { Route, useHistory, Redirect } from 'react-router-dom';
import NavUnidadPopUp from './NavUnidadPopUp';
import ListaReclamos from './ListaReclamos';
import PersonasDeUnidad from './PersonasDeUnidad';
import UnidadAccion from './UnidadAccion';
import { useUnidad } from './hooks/useUnidad';
import { usePostConToast } from './hooks/useHttp';
import { usePersonas } from './hooks/usePersonas';

export default function UnidadPopUp({ match, retornoUrl }) {
  const unidad = useUnidad(match.params.id);
  const history = useHistory();
  const post = usePostConToast();

  const handleClose = event => {
    history.replace(retornoUrl);
  };

  /**
   *
   * @param {string} tipoPersona
   */
  const fetchPersonas = tipoPersona =>
    `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/${tipoPersona}`;

  /**
   *
   * @param {string} tipoPersona
   * @param {string} documento
   * @return {void}
   */
  const addPersona = (tipoPersona, documento) => {
    post(
      `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/agregar${tipoPersona}`,
      { documento }
    ).catch(() => {});
  };

  const urlReclamos = () =>
    `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/reclamos`;

  /**
   *
   * @param {string} documento
   */
  const alquilar = async documento => {
    post(`http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/alquilar`, {
      documento
    }).catch(() => {});
  };

  /**
   *
   * @param {string} documento
   */
  const transferir = async documento => {
    post(`http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/transferir`, {
      documento
    }).catch(() => {});
  };

  const liberar = async () => {
    post(
      `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/liberar/`,
      {}
    ).catch(() => {});
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {unidad && <NavUnidadPopUp url={match.url} habitado={unidad.habitado} liberar={liberar} />}
        <button onClick={handleClose} className="close">
          X
        </button>
        <Route
          path={`${match.url}/inquilinos`}
          render={() => (
            <ListaPersonasContainer url={fetchPersonas('inquilinos')} when={unidad}>
              {personas => <PersonasDeUnidad personas={personas} tipoPersona="Inquilino" addPersona={addPersona} />}
            </ListaPersonasContainer>
          )}
        />
        <Route
          exact
          path={`${match.url}/duenios`}
          render={() => (
            <ListaPersonasContainer url={fetchPersonas('duenios')} when={unidad}>
              {personas => <PersonasDeUnidad personas={personas} tipoPersona="Duenio" addPersona={addPersona} />}
            </ListaPersonasContainer>
          )}
        />
        <Route
          exact
          path={`${match.url}/reclamos`}
          render={() => unidad && <ListaReclamos url={urlReclamos()} labelClass="" hacerReclamo={false} />}
        />
        <Route
          exact
          path={`${match.url}/alquilar`}
          render={() => unidad && <UnidadAccion accion={alquilar} textoBoton="Alquilar" />}
        />
        <Route
          exact
          path={`${match.url}/transferir`}
          render={() => unidad && <UnidadAccion accion={transferir} textoBoton="Transferir" />}
        />
        <Redirect exact from="/" to={`${match.url}/reclamos`} />
      </div>
    </div>
  );
}

function ListaPersonasContainer({ children, url, when }) {
  const { personas } = usePersonas(url);
  return when && children(personas);
}
