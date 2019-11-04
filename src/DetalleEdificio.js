import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import ListaUnidades from './ListaUnidades';
import ListaReclamos from './ListaReclamos';
import ListaPersonas from './ListaPersonas';

import { withRouter } from 'react-router';

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

  const navStyle = {
    width: '100%'
  };

  return (
    <div>
      <h2>
        <b>{edificio.nombre}</b>
      </h2>
      <nav>
        <ul className="nav-links" style={navStyle}>
          <Link to={`${match.url}/unidades`}>
            <li>Unidades</li>
          </Link>
          <Link to={`${match.url}/inquilinos`}>
            <li>Inquilinos</li>
          </Link>
          <Link to={`${match.url}/duenios`}>
            <li>Duenios</li>
          </Link>
          <Link to={`${match.url}/habilitados`}>
            <li>Habilitados</li>
          </Link>
          <Link to={`${match.url}/reportes`}>
            <li>Reportes</li>
          </Link>
        </ul>
      </nav>
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
