import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import NavUnidadPopUp from './NavUnidadPopUp';
import ListaPersonas from './ListaPersonas';
import ListaReclamos from './ListaReclamos';

const fetchUnidad = async id => {
  const data = await fetch(`http://localhost:8080/unidades/${id}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function useUnidad(id) {
  const [unidad, setUnidad] = useState(null);

  useEffect(() => {
    fetchUnidad(id).then(setUnidad);
    return () => undefined;
  }, [id]);

  return unidad;
}

export default function UnidadPopUp({ match }) {
  const unidad = useUnidad(match.params.id);
  // const url = `unidades/${unidad.codigo}/${unidad.piso}/${unidad.numero}`;
  const fetchUrl = 'http://localhost:8080/edificios';

  return (
    <div className="modal">
      <button className="close">X</button>
      <div className="modal-content">
        <NavUnidadPopUp url={match.url} />
        <Route
          exact
          path={`${match.url}/inquilinos`}
          render={() => <ListaPersonas id={match.params.id} url={fetchUrl} tipoPersona={'habitantes'} />}
        />
        <Route
          exact
          path={`${match.url}/duenios`}
          render={() => <ListaPersonas id={match.params.id} url={fetchUrl} tipoPersona={'duenios'} />}
        />
        <Route exact path={`${match.url}/reclamos`} render={() => <ListaReclamos id={match.params.id} />} />
      </div>
    </div>
  );
}
