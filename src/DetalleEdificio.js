import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListaUnidades from './ListaUnidades';
import ListaReclamos from './ListaReclamos';
import ListaPersonas from './ListaPersonas';

import { withRouter } from 'react-router';
import NavDetalleEdificio from './NavDetalleEdificio';

const fetchEdificio = async id => {
  const data = await fetch(`http://localhost:8080/edificios/${id}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function useEdificio(id) {
  const [edificio, setEdificio] = useState([]);

  useEffect(() => {
    fetchEdificio(id).then(setEdificio);
    return () => undefined;
  }, [id]);

  return edificio;
}

export default withRouter(DetalleEdificio);

function DetalleEdificio({ match }) {
  const id = match.params.id;
  const edificio = useEdificio(id);

  return (
    <div>
      <h2 className={'nav-titulo'}>
        <b>{edificio.nombre}</b>
      </h2>
      <NavDetalleEdificio url={match.url} />
      <Switch>
        <Route path={`${match.url}/unidades`} render={() => <ListaUnidades id={match.params.id} />} />
        <Route
          path={`${match.url}/inquilinos`}
          render={() => <ListaPersonas id={match.params.id} target="habitantes" />}
        />
        <Route path={`${match.url}/duenios`} render={() => <ListaPersonas id={match.params.id} target="duenios" />} />
        <Route
          path={`${match.url}/habilitados`}
          render={() => <ListaPersonas id={match.params.id} target="habilitados" />}
        />
        <Route path={`${match.url}/reportes`} render={() => <ListaReclamos id={match.params.id} />} />
      </Switch>
    </div>
  );
}
