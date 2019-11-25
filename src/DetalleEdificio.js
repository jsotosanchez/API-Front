import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useEdificio } from './hooks/useEdificio';
import ListaUnidades from './ListaUnidades';
import ListaReclamos from './ListaReclamos';
import ListaPersonas from './ListaPersonas';
import { useSessionContext } from './SessionContext';

import { withRouter } from 'react-router';
import NavDetalleEdificio from './NavDetalleEdificio';
import { useFetchConToast } from './hooks/useHttp';

export default withRouter(DetalleEdificio);

function DetalleEdificio({ match }) {
  const id = match.params.id;
  const edificio = useEdificio(id);
  const contexto = useSessionContext();
  const isDuenio = contexto.isDuenio();
  const isAdmin = contexto.isAdmin();
  const fetchConToast = useFetchConToast();

  const fetchPersonas = async (id, tipoPersona) => {
    return fetchConToast(`http://localhost:8080/edificios/${id}/${tipoPersona}`);
  };

  const fetchReclamos = async id => {
    return fetchConToast(`http://localhost:8080/edificios/${id}/reclamos`);
  };

  return (
    <div>
      <h2 className={'nav-titulo'}>
        <b>{edificio.nombre}</b>
      </h2>
      <NavDetalleEdificio url={match.url} />
      <Switch>
        <Route path={`${match.url}/unidades`} render={() => isDuenio && <ListaUnidades id={match.params.id} />} />
        <Route
          path={`${match.url}/inquilinos`}
          render={() => (
            <ListaPersonas fetchPersonas={() => fetchPersonas(match.params.id, 'habitantes')} labelClass="" />
          )}
        />
        <Route
          path={`${match.url}/duenios`}
          render={() => (
            <ListaPersonas fetchPersonas={() => isAdmin && fetchPersonas(match.params.id, 'duenios')} labelClass="" />
          )}
        />
        <Route
          path={`${match.url}/habilitados`}
          render={() => (
            <ListaPersonas
              fetchPersonas={() => isAdmin && fetchPersonas(match.params.id, 'habilitados')}
              labelClass=""
            />
          )}
        />
        <Route
          path={`${match.url}/reclamos`}
          render={() => <ListaReclamos fetchReclamos={() => fetchReclamos(match.params.id)} />}
        />
        <Redirect from="" to={`${match.url}/reclamos`} />
      </Switch>
    </div>
  );
}
