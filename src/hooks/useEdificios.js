import { useState, useEffect, useMemo } from 'react';
import { useFetchConToast } from './useHttp';

export function useEdificios() {
  const [edificios, setEdificios] = useState([]);
  const fetch = useFetchConToast();

  useEffect(() => {
    let callback = true;

    if (!edificios.length) fetch('http://localhost:8080/edificios').then(data => callback && setEdificios(data));

    return () => {
      callback = false;
    };
  }, [fetch, edificios]);

  return edificios;
}

export function useFiltrarEdificios(filtro) {
  const edificios = useEdificios();
  return useMemo(() => edificios.filter(e => e.nombre.toLowerCase().includes(filtro.toLowerCase())), [
    filtro,
    edificios
  ]);
}
