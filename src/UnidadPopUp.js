import React from 'react';
import { Route } from 'react-router-dom';
import NavUnidadPopUp from './NavUnidadPopUp';
import ListaReclamos from './ListaReclamos';
import PersonasDeUnidad from './PersonasDeUnidad';
import { useUnidad } from './hooks/useUnidad';

export default function UnidadPopUp({ match }) {
  const unidad = useUnidad(match.params.id);

  const fetchPersonas = async tipoPersona => {
    const data = await fetch(
      `http://localhost:8080/unidades/${unidad.id}/${unidad.piso}/${unidad.numero}/${tipoPersona}`
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
    console.log('ADD PERSONA!');
    fetch(
      `http://localhost:8080/unidades/${unidad.id}/${unidad.piso}/${unidad.numero}/agregar${tipoPersona}/${documento}`,
      {
        method: 'post'
      }
    );
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
                tipoPersona="Inquilinos"
                addPersona={addPersona}
              />
            )
          }
        />
        <Route
          exact
          path={`${match.url}/duenios`}
          render={() => unidad && <PersonasDeUnidad fetchPersonas={() => fetchPersonas('duenios')} />}
        />
        <Route exact path={`${match.url}/reclamos`} render={() => <ListaReclamos id={match.params.id} />} />
      </div>
    </div>
  );
}
