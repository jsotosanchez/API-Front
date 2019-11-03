import React, { useState, useEffect, useMemo } from 'react';
import CardPersona from './CardPersona';

function useDuenios(id) {
  const [duenios, setDuenios] = useState([]);

  const fetchUnidades = async () => {
    const data = await fetch(`http://localhost:8080/edificios/${id}/duenios`);
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  useEffect(() => {
    fetchUnidades().then(setDuenios);
    return () => undefined;
  }, [id]);

  return duenios;
}

function useFiltrarDuenios(id, filtro) {
  const duenios = useDuenios(id);

  return useMemo(
    () =>
      duenios.filter(
        e =>
          e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          e.documento.toLowerCase().includes(filtro.toLowerCase())
      ),
    [duenios, filtro]
  );
}

export default function ListaDuenios({ id }) {
  const [filtro, setFiltro] = useState('');
  const duenios = useFiltrarDuenios(id, filtro);

  const handleInputFiltro = event => setFiltro(event.target.value);

  return (
    <div>
      <label>
        Buscar:
        <input type="text" name="filtro" placeholder="nombre o doc" onChange={handleInputFiltro} />
      </label>
      <div className="lista-unidades">
        {duenios.map(u => (
          <CardPersona key={u.id} documento={u.documento} nombre={u.nombre} className="card-unidad" />
        ))}
      </div>
    </div>
  );
}
