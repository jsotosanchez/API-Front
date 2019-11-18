import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useEdificio } from './hooks/useEdificio';
import ListaUnidades from './ListaUnidades';
import ListaReclamos from './ListaReclamos';
import ListaPersonas from './ListaPersonas';

import { withRouter } from 'react-router';
import NavDetalleEdificio from './NavDetalleEdificio';

export default withRouter(DetalleEdificio);

function DetalleEdificio({ match }) {
  const url = 'http://localhost:8080/edificios';
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
          render={() => <ListaPersonas id={match.params.id} url={url} tipoPersona="habitantes" />}
        />
        <Route
          path={`${match.url}/duenios`}
          render={() => <ListaPersonas id={match.params.id} url={url} tipoPersona="duenios" />}
        />
        <Route
          path={`${match.url}/habilitados`}
          render={() => <ListaPersonas id={match.params.id} url={url} tipoPersona="habilitados" />}
        />
        <Route path={`${match.url}/reportes`} render={() => <ListaReclamos id={match.params.id} />} />
      </Switch>
    </div>
  );
}
