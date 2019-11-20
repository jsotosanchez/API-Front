import React from 'react';
import { Route } from 'react-router-dom';
import NavUnidadPopUp from './NavUnidadPopUp';
import ListaReclamos from './ListaReclamos';
import PersonasDeUnidad from './PersonasDeUnidad';
import { useUnidad } from './hooks/useUnidad';

export default function UnidadPopUp({ match }) {
  const unidad = useUnidad(match.params.id);
  console.log('unidad', unidad);

  const fetchPersonas = async tipoPersona => {
    const data = await fetch(
      `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/${tipoPersona}`
    );
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  /**
   *
   * @param {string} tipoPersona
   * @param {string} documento
   * @return {void}
   */
  const addPersona = (tipoPersona, documento) => {
    fetch(
      `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/agregar${tipoPersona}/${documento}`,
      {
        method: 'post'
      }
    );
  };

  const fetchReclamos = async () => {
    const data = await fetch(
      `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/reclamos`
    );
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  return (
    <div className="modal">
      <button className="close">X</button>
      <div className="modal-content">
        <NavUnidadPopUp url={match.url} />
        <Route
          path={`${match.url}/inquilinos`}
          render={() =>
            unidad && (
              <PersonasDeUnidad
                fetchPersonas={() => fetchPersonas('inquilinos')}
                tipoPersona="Inquilino"
                addPersona={addPersona}
              />
            )
          }
        />
        <Route
          exact
          path={`${match.url}/duenios`}
          render={() =>
            unidad && (
              <PersonasDeUnidad
                fetchPersonas={() => fetchPersonas('duenios')}
                tipoPersona="Duenio"
                addPersona={addPersona}
              />
            )
          }
        />
        <Route
          exact
          path={`${match.url}/reclamos`}
          render={() => <ListaReclamos fetchReclamos={() => fetchReclamos()} />}
        />
      </div>
    </div>
  );
}
