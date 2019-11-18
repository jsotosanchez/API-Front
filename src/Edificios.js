import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useFiltrarEdificios } from './hooks/useEdificio';
import CardEdificio from './CardEdificio';
import DetalleEdificio from './DetalleEdificio';
import classNames from 'classnames';

export default function Edificios({ match }) {
  const [filtro, setFiltro] = useState('');
  const edificios = useFiltrarEdificios(filtro);

  /**
   * @template {HTMLInputElement} T
   * @param {React.ChangeEvent<T>} event
   */
  const handleChange = event => setFiltro(event.target.value);

  return (
    <div>
      <form className={classNames('form-filter')}>
        <label>
          Buscar:
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
        </label>
      </form>
      <div className="container">
        <section>
          {edificios.map(e => (
            <Link to={`${match.url}/${e.codigo}`} key={e.codigo}>
              <CardEdificio nombre={e.nombre} direccion={e.direccion} className="card" />
            </Link>
          ))}
        </section>
        <Route
          path={`${match.url}/:id`}
          render={() => (
            <section className="detalle-edificio">
              <DetalleEdificio />
            </section>
          )}
        ></Route>
      </div>
    </div>
  );
}
