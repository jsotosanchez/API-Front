import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import ListaUnidades from './ListaUnidades';
import ListaReclamos from './ListaReclamos';
import ListaPersonas from './ListaPersonas';

import { withRouter } from 'react-router';

export default withRouter(DetalleEdificio);

function DetalleEdificio({ nombre, match }) {
  const navStyle = {
    width: '100%'
  };

  return (
    <div>
      <h2>{nombre}</h2>
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
