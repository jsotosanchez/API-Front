import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useEdificio } from './hooks/useEdificio';
import ListaUnidades from './ListaUnidades';
import ListaReclamos from './ListaReclamos';
import ListaPersonas from './ListaPersonas';
import { useSessionContext } from './SessionContext';

import { withRouter } from 'react-router';
import NavDetalleEdificio from './NavDetalleEdificio';
import { useFiltrarPersonas } from './hooks/usePersonas';

export default withRouter(DetalleEdificio);

function DetalleEdificio({ match }) {
  const id = match.params.id;
  const edificio = useEdificio(id);
  const contexto = useSessionContext();
  const isDuenio = contexto.isDuenio();
  const isAdmin = contexto.isAdmin();

  const urlInquilinos = () => `http://localhost:8080/edificios/${id}/habitantes`;
  const urlDuenios = () => `http://localhost:8080/edificios/${id}/duenios`;
  const urlHabilitados = () => `http://localhost:8080/edificios/${id}/habilitados`;

  const fetchReclamos = id => {
    return `http://localhost:8080/edificios/${id}/reclamos`;
  };

  return (
    <div>
      <h2 className={'nav-titulo'}>
        <b>{edificio.nombre}</b>
      </h2>
      <NavDetalleEdificio url={match.url} />
      <Switch>
        <Route path={`${match.url}/unidades`} render={() => isDuenio && <ListaUnidades id={match.params.id} />} />
        <Route path={`${match.url}/inquilinos`} render={() => <ListaPersonasContainer url={urlInquilinos()} />} />
        <Route path={`${match.url}/duenios`} render={() => isAdmin && <ListaPersonasContainer url={urlDuenios()} />} />
        <Route
          path={`${match.url}/habilitados`}
          render={() => isAdmin && <ListaPersonasContainer url={urlHabilitados()} />}
        />
        <Route path={`${match.url}/reclamos`} render={() => <ListaReclamos url={fetchReclamos(match.params.id)} />} />
        <Redirect from="" to={`${match.url}/reclamos`} />
      </Switch>
    </div>
  );
}

function ListaPersonasContainer({ url }) {
  const [filtro, setFiltro] = useState('');

  const { personas } = useFiltrarPersonas(filtro, url);

  return <ListaPersonas personas={personas} labelClass="" setFiltro={setFiltro} />;
}
