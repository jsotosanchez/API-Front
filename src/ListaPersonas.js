import React, { useState, useEffect, useMemo } from 'react';
import CardPersona from './CardPersona';

const fetchPersonas = async (id, url, tipoPersona) => {
  const data = await fetch(`${url}/${id}/${tipoPersona}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function usePersonas(id, url, tipoPersona) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetchPersonas(id, url, tipoPersona).then(setPersonas);
    return () => undefined;
  }, [id, url, tipoPersona]);

  return personas;
}

function useFiltrarPersonas(id, filtro, url, tipoPersona) {
  const personas = usePersonas(id, url, tipoPersona);

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

export default function ListaPersonas({ id, url, tipoPersona }) {
  const [filtro, setFiltro] = useState('');
  const personas = useFiltrarPersonas(id, filtro, url, tipoPersona);
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
          <CardPersona key={u.documento + u.nombre} documento={u.documento} nombre={u.nombre} className="card" />
        ))}
      </div>
    </div>
  );
}
