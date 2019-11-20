import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link, Switch, Route } from 'react-router-dom';

import { useFiltrarReclamos } from './hooks/useReclamos';
import CardReclamo from './CardReclamo';
import ReclamoPopUp from './ReclamoPopUp';

// @ts-ignore
export default withRouter(ListaReclamos);

function ListaReclamos({ match, fetchReclamos }) {
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [estado, setEstado] = useState('nuevo');
  const reclamos = useFiltrarReclamos(fetchReclamos, estado, filtroUsuario);

  const handleInputNombre = event => setFiltroUsuario(event.target.value);
  const handleInputEstado = event => {
    setEstado(event.target.value);
  };

  return (
    <div>
      <label>
        Buscar:
        <input type="text" name="nombre" placeholder="persona o edificio" onChange={handleInputNombre} />
      </label>
      <select onChange={handleInputEstado}>
        <option value="nuevo">Nuevo</option>
        <option value="abierto">Abierto</option>
        <option value="enProceso">En Proceso</option>
        <option value="desestimado">Desestimado</option>
        <option value="anulado">Anulado</option>
        <option value="terminado">Terminado</option>
      </select>
      <div className="lista-reclamos">
        {reclamos.map(r => (
          <Link to={`${match.url}/${r.numero}`} key={r.numero}>
            <CardReclamo estado={r.estado} nombre={r.usuario.nombre} edificio={r.edificio.nombre} className="card" />
          </Link>
        ))}
      </div>
      <Switch>
        <Route path={`${match.url}/:id`} component={ReclamoPopUp} />
      </Switch>
    </div>
  );
}
