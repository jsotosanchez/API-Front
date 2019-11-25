import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link, Switch, Route } from 'react-router-dom';

import { useFiltrarReclamos } from './hooks/useReclamos';

import GenerarReclamo from './GenerarReclamo';
import CardReclamo from './CardReclamo';
import ReclamoPopUp from './ReclamoPopUp';

// @ts-ignore
export default withRouter(ListaReclamos);

function ListaReclamos({ match, fetchReclamos, labelClass, hacerReclamo }) {
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [estado, setEstado] = useState('nuevo');
  const [refresh, setRefresh] = useState(0);

  const reclamos = useFiltrarReclamos(fetchReclamos, estado, filtroUsuario, refresh);

  const handleInputNombre = event => {
    setFiltroUsuario(event.target.value);
  };
  const handleInputEstado = event => {
    setEstado(event.target.value);
    setRefresh(refresh + 1);
  };

  const buttonStyle = {
    marginTop: '2.5em'
  };

  return (
    <div>
      <div className="form">
        <div className="form-row">
          <div className="form-group col-4">
            <label className={labelClass}>
              Buscar:
              <input
                className="form-control"
                type="text"
                name="nombre"
                placeholder="persona o edificio"
                onChange={handleInputNombre}
              />
            </label>
          </div>
          <div className="form-group col-4">
            <label className={labelClass}>
              Estado:
              <select className="form-control" onChange={handleInputEstado}>
                <option value="nuevo">Nuevo</option>
                <option value="abierto">Abierto</option>
                <option value="enProceso">En Proceso</option>
                <option value="desestimado">Desestimado</option>
                <option value="anulado">Anulado</option>
                <option value="terminado">Terminado</option>
              </select>
            </label>
          </div>
          {hacerReclamo && (
            <Link to={`${match.url}/generarReclamo`}>
              <button style={buttonStyle} className="button">
                Hacer reclamo
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="lista-unidades">
        {reclamos.map(r => (
          <Link to={`${match.url}/${r.numero}`} key={r.numero}>
            <CardReclamo estado={r.estado} nombre={r.usuario.nombre} edificio={r.edificio.nombre} className="card" />
          </Link>
        ))}
      </div>
      <Switch>
        <Route exact path={`${match.url}/generarReclamo`} render={() => hacerReclamo && <GenerarReclamo />} />
        <Route path={`${match.url}/:id`} component={ReclamoPopUp} />
      </Switch>
    </div>
  );
}
