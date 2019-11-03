import React, { useState, useEffect, useMemo } from 'react';
import CardPersona from './CardPersona';

const fetchPersonas = async (id, target) => {
  const data = await fetch(`http://localhost:8080/edificios/${id}/${target}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function usePersonas(id, target) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetchPersonas(id, target).then(setPersonas);
    return () => undefined;
  }, [id, target]);

  return personas;
}

function useFiltrarPersonas(id, filtro, target) {
  const personas = usePersonas(id, target);

  return useMemo(
    () =>
      personas.filter(
        e =>
          e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          e.documento.toLowerCase().includes(filtro.toLowerCase())
      ),
    [personas, filtro]
  );
}

export default function ListaPersonas({ id, target }) {
  const [filtro, setFiltro] = useState('');
  const personas = useFiltrarPersonas(id, filtro, target);
  console.log(personas);

  const handleInputFiltro = event => setFiltro(event.target.value);

  return (
    <div>
      <label>
        Buscar:
        <input type="text" name="filtro" placeholder="nombre o doc" onChange={handleInputFiltro} />
      </label>
      <div className="lista-unidades">
        {personas.map(u => (
          <CardPersona key={u.documento + u.nombre} documento={u.documento} nombre={u.nombre} className="card-unidad" />
        ))}
      </div>
    </div>
  );
}
