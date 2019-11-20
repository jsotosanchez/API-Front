import React from 'react';
import { Route } from 'react-router-dom';
import NavUnidadPopUp from './NavUnidadPopUp';
import ListaReclamos from './ListaReclamos';
import PersonasDeUnidad from './PersonasDeUnidad';
import UnidadAlquilar from './UnidadAlquilar';
import { useUnidad } from './hooks/useUnidad';

export default function UnidadPopUp({ match }) {
  const unidad = useUnidad(match.params.id);

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

  const alquilar = async documento => {
    fetch(
      `http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/alquilar/${documento}`,
      {
        method: 'post'
      }
    );
  };

  const liberar = async () => {
    console.log('liberar');
    fetch(`http://localhost:8080/unidades/${unidad.edificio.codigo}/${unidad.piso}/${unidad.numero}/liberar/`, {
      method: 'post'
    });
  };

  return (
    <div className="modal">
      <button className="close">X</button>
      <div className="modal-content">
        {unidad && <NavUnidadPopUp url={match.url} habitado={unidad.habitado} liberar={liberar} />}
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
          render={() => unidad && <ListaReclamos fetchReclamos={fetchReclamos} />}
        />
        <Route
          exact
          path={`${match.url}/alquilar`}
          render={() =>
            unidad && (
              <UnidadAlquilar
                codigo={unidad.edificio.codigo}
                piso={unidad.piso}
                numero={unidad.numero}
                alquilar={alquilar}
              />
            )
          }
        />
      </div>
    </div>
  );
}
