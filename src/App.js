import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './app.css';

import Reclamos from './Reclamos';
import Edificios from './Edificios';
import Personas from './Personas';
import Nav from './Nav';
import { SessionContext, useContextoSesion } from './SessionContext';

export default function App() {
  const contexto = useContextoSesion();

  return (
    <SessionContext.Provider value={contexto}>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/edificios" component={Edificios} />
            <Route path="/reclamos" component={Reclamos} />
            <Route path="/personas" component={Personas} />
            <Redirect exact from="/" to="/edificios" />
          </Switch>
        </div>
      </Router>
    </SessionContext.Provider>
  );
}
