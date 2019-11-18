import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { useFiltrarReclamos } from './hooks/useReclamos';
import CardReclamo from './CardReclamo';

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
            className="card"
          />
        ))}
      </div>
    </div>
  );
}
