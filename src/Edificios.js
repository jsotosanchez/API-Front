import React, { useState, useEffect, useMemo } from 'react';
import CardEdificio from './CardEdificio';

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
  return useMemo(() => edificios.filter(e => e.nombre.includes(filtro)), [filtro, edificios]);
}

export default function Edificios() {
  const [filtro, setFiltro] = useState('');

  const edificios = useFiltrarEdificios(filtro);

  const handleChange = event => setFiltro(event.target.value);

  return (
    <div>
      <form>
        <label>
          Buscar:
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
        </label>
      </form>
      {edificios.map(i => (
        <CardEdificio id={i.codigo} nombre={i.nombre} direccion={i.direccion} className="card" key={i.codigo} />
      ))}
    </div>
  );
}
