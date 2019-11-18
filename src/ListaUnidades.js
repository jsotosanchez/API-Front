import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link, Switch, Route } from 'react-router-dom';

import { useFiltrarUnidades } from './hooks/useUnidades';
import CardUnidad from './CardUnidad';
import UnidadPopUp from './UnidadPopUp';

// @ts-ignore
export default withRouter(ListaUnidades);

function ListaUnidades({ match, id }) {
  const [verSoloDisponibles, setVerSoloDisponibles] = useState(true);
  const [piso, setPiso] = useState(null);
  const unidades = useFiltrarUnidades(id, verSoloDisponibles, piso);

  const filtrarHabitadas = () => {
    setVerSoloDisponibles(!verSoloDisponibles);
  };

  const handleInputPiso = event => setPiso(event.target.value);
  return (
    <div>
      <label>
        Piso:
        <input type="number" name="piso" placeholder="" onChange={handleInputPiso} />
      </label>
      <button className="button" onClick={() => filtrarHabitadas()}>
        {verSoloDisponibles ? 'Disponibles' : 'No disponibles'}
      </button>
      <div className="lista-unidades">
        {unidades.map(u => (
          <Link to={`${match.url}/${u.id}`} key={u.id}>
            <CardUnidad piso={u.piso} numero={u.numero} className="card" />
          </Link>
        ))}
      </div>
      <Switch>
        <Route path={`${match.url}/:id`} component={UnidadPopUp} />
      </Switch>
    </div>
  );
}
