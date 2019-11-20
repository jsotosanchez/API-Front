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
  const id = match.params.id;
  const edificio = useEdificio(id);

  const fetchPersonas = async (id, tipoPersona) => {
    const data = await fetch(`http://localhost:8080/edificios/${id}/${tipoPersona}`);
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  const fetchReclamos = async id => {
    const data = await fetch(`http://localhost:8080/edificios/${id}/reclamos`);
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  return (
    <div>
      <h2 className={'nav-titulo'}>
        <b>
          {
            // @ts-ignore
            edificio.nombre
          }
        </b>
      </h2>
      <NavDetalleEdificio url={match.url} />
      <Switch>
        <Route path={`${match.url}/unidades`} render={() => <ListaUnidades id={match.params.id} />} />
        <Route
          path={`${match.url}/inquilinos`}
          render={() => <ListaPersonas fetchPersonas={() => fetchPersonas(match.params.id, 'habitantes')} />}
        />
        <Route
          path={`${match.url}/duenios`}
          render={() => <ListaPersonas fetchPersonas={() => fetchPersonas(match.params.id, 'duenios')} />}
        />
        <Route
          path={`${match.url}/habilitados`}
          render={() => <ListaPersonas fetchPersonas={() => fetchPersonas(match.params.id, 'habilitados')} />}
        />
        <Route
          path={`${match.url}/reportes`}
          render={() => <ListaReclamos fetchReclamos={() => fetchReclamos(match.params.id)} />}
        />
      </Switch>
    </div>
  );
}
