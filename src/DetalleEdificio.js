import React, { useState, useMemo, useEffect } from 'react';
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

  const fetchPersonas = useMemo(
    () => async (id, tipoPersona) => {
      return fetchConToast(`http://localhost:8080/edificios/${id}/${tipoPersona}`);
    },
    [fetchConToast]
  );

  const fetchReclamos = useMemo(
    () => async id => {
      return fetchConToast(`http://localhost:8080/edificios/${id}/reclamos`);
    },
    [fetchConToast]
  );

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
          render={() => <ListaInquilinos fetch={fetchPersonas} match={match} tipo="habitantes" />}
        />
        <Route
          path={`${match.url}/duenios`}
          render={() => isAdmin && <ListaInquilinos fetch={fetchPersonas} match={match} tipo="duenios" />}
        />
        <Route
          path={`${match.url}/habilitados`}
          render={() => isAdmin && <ListaInquilinos fetch={fetchPersonas} match={match} tipo="habilitados" />}
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

function ListaInquilinos({ fetch, match, tipo }) {
  const [filtro, setFiltro] = useState('');
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    let callback = true;
    fetch(match.params.id, tipo).then(data => callback && setPersonas(data));
    return () => {
      callback = false;
    };
  }, [fetch, match, tipo]);

  const personasFiltradas = useMemo(
    () =>
      personas.filter(
        e =>
          e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          e.documento.toLowerCase().includes(filtro.toLowerCase())
      ),
    [personas, filtro]
  );

  return <ListaPersonas personas={personasFiltradas} labelClass="" setFiltro={setFiltro} />;
}
