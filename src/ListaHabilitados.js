import React, { useState, useEffect, useMemo } from 'react';
import CardPersona from './CardPersona';

function useHabilitados(id) {
  const [habilitados, setHabilitados] = useState([]);

  const fetchUnidades = async () => {
    const data = await fetch(`http://localhost:8080/edificios/${id}/habilitados`);
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  useEffect(() => {
    fetchUnidades().then(setHabilitados);
    return () => undefined;
  }, [id]);

  return habilitados;
}

function useFiltrarHabilitados(id, filtro) {
  const habilitados = useHabilitados(id);

  return useMemo(
    () =>
      habilitados.filter(
        e =>
          e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          e.documento.toLowerCase().includes(filtro.toLowerCase())
      ),
    [habilitados, filtro]
  );
}

export default function ListaHabilitados({ id }) {
  const [filtro, setFiltro] = useState('');
  const habilitados = useFiltrarHabilitados(id, filtro);

  const handleInputFiltro = event => setFiltro(event.target.value);

  return (
    <div>
      <label>
        Buscar:
        <input type="text" name="filtro" placeholder="nombre o doc" onChange={handleInputFiltro} />
      </label>
      <div className="lista-unidades">
        {habilitados.map(u => (
          <CardPersona key={u.id} documento={u.documento} nombre={u.nombre} className="card-unidad" />
        ))}
      </div>
    </div>
  );
}
