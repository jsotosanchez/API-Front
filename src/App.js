import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import './App.css';

import Reclamos from './Reclamos';
import Edificios from './Edificios';
import Personas from './Personas';
import Nav from './Nav';
import AdminOnly from './AdminOnly';
import { useSessionContext } from './SessionContext';
import SessionContainer from './SessionContainer';
import Login from './Login';

function App() {
  const contexto = useSessionContext();
  const isLoggedIn = contexto.isLoggedIn();

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Nav />}
        <Switch>
          {isLoggedIn && <Route path="/edificios" component={Edificios} />}
          {isLoggedIn && <Route path="/reclamos" component={Reclamos} />}
          {isLoggedIn && (
            <AdminOnly>
              <Route path="/personas" component={Personas} />
            </AdminOnly>
          )}
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
      </div>
    </Router>
  );
}

export default function appWithSession() {
  return (
    <SessionContainer>
      <App />
    </SessionContainer>
  );
}
