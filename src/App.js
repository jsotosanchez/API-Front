import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './app.css';

import Reclamos from './Reclamos';
import Edificios from './Edificios';
import Nav from './Nav';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/reclamos" component={Reclamos} />
          <Route path="/edificios" component={Edificios} />
        </Switch>
      </div>
    </Router>
  );
}
