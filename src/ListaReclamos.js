import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router';

import CardReclamo from './CardReclamo';

const fetchReclamos = async id => {
  const data = await fetch(`http://localhost:8080/edificios/${id}/reclamos`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function useReclamos(id) {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    fetchReclamos(id).then(setReclamos);
    return () => undefined;
  }, [id]);

  return reclamos;
}

function useFiltrarReclamos(id, estado, filtroUsuario) {
  const reclamos = useReclamos(id);
  return useMemo(
    () =>
      reclamos.filter(
        r =>
          r.estado.includes(estado) &&
          (r.usuario.nombre.toLowerCase().includes(filtroUsuario.toLowerCase()) ||
            r.edificio.nombre.toLowerCase().includes(filtroUsuario.toLowerCase()))
      ),
    [reclamos, estado, filtroUsuario]
  );
}

export default withRouter(ListaReclamos);

function ListaReclamos({ id }) {
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [estado, setEstado] = useState('nuevo');
  const reclamos = useFiltrarReclamos(id, estado, filtroUsuario);

  const handleInputNombre = event => setFiltroUsuario(event.target.value);
  const handleInputEstado = event => {
    setEstado(event.target.value);
    console.log(event.target.value);
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
        {reclamos.map(u => (
          <CardReclamo
            key={u.numero}
            estado={u.estado}
            nombre={u.usuario.nombre}
            edificio={u.edificio.nombre}
            className="card-unidad"
          />
        ))}
      </div>
    </div>
  );
}
