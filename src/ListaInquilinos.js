import React, { useState, useEffect, useMemo } from 'react';
import CardUnidad from './CardUnidad';

function useInquilinos(id) {
  const [inquilinos, setInquilinos] = useState([]);

  const fetchUnidades = async () => {
    const data = await fetch(`http://localhost:8080/edificios/${id}/habitantes`);
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  useEffect(() => {
    fetchUnidades().then(setInquilinos);
    return () => undefined;
  }, [id]);

  return inquilinos;
}

function useFiltrarInquilinos(id, filtro) {
  const inquilinos = useInquilinos(id);

  return useMemo(
    () =>
      inquilinos.filter(
        e =>
          e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          e.documento.toLowerCase().includes(filtro.toLowerCase())
      ),
    [inquilinos, filtro]
  );
}

export default function ListaInquilinos({ id }) {
  const [filtro, setFiltro] = useState('');
  const inquilinos = useFiltrarInquilinos(id, filtro);

  const handleInputFiltro = event => setFiltro(event.target.value);

  return (
    <div>
      <label>
        Buscar:
        <input type="text" name="filtro" placeholder="nombre o doc" onChange={handleInputFiltro} />
      </label>
      <div className="lista-unidades">
        {inquilinos.map(u => (
          <CardUnidad key={u.id} piso={u.documento} numero={u.nombre} className="card-unidad" />
        ))}
      </div>
    </div>
  );
}
