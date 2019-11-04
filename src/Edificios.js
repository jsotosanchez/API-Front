import React, { useState, useEffect, useMemo } from 'react';
import { Link, Route } from 'react-router-dom';
import CardEdificio from './CardEdificio';
import DetalleEdificio from './DetalleEdificio';
import classNames from 'classnames';

function useEdificios() {
  const [edificios, setEdificios] = useState([]);
  const fetchEdificios = async () => {
    const data = await fetch('http://localhost:8080/edificios');
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  useEffect(() => {
    fetchEdificios().then(setEdificios);
    return () => undefined;
  }, []);

  return edificios;
}

function useFiltrarEdificios(filtro) {
  const edificios = useEdificios();
  return useMemo(() => edificios.filter(e => e.nombre.toLowerCase().includes(filtro.toLowerCase())), [
    filtro,
    edificios
  ]);
}

export default function Edificios({ match }) {
  const [filtro, setFiltro] = useState('');
  const edificios = useFiltrarEdificios(filtro);

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
              <CardEdificio nombre={e.nombre} direccion={e.direccion} className="card-edificio" />
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
