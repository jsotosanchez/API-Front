import { useState, useEffect, useMemo } from 'react';
import { fetchToServer } from '../http';
import { useSessionContext } from '../SessionContext';

export function useEdificios() {
  const [edificios, setEdificios] = useState([]);
  const contexto = useSessionContext();
  const fetchEdificios = async () => {
    const data = await fetchToServer('http://localhost:8080/edificios', contexto);
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
