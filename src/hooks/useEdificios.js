import { useState, useEffect, useMemo } from 'react';

export function useEdificios() {
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

export function useFiltrarEdificios(filtro) {
  const edificios = useEdificios();
  return useMemo(() => edificios.filter(e => e.nombre.toLowerCase().includes(filtro.toLowerCase())), [
    filtro,
    edificios
  ]);
}
