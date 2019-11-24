import { useState, useMemo } from 'react';
import { useFetchConToast } from './useHttp';

export function useEdificios() {
  const [edificios, setEdificios] = useState([]);

  const fetch = useFetchConToast(setEdificios);

  fetch('http://localhost:8080/edificios');

  return edificios;
}

export function useFiltrarEdificios(filtro) {
  const edificios = useEdificios();
  return useMemo(() => edificios.filter(e => e.nombre.toLowerCase().includes(filtro.toLowerCase())), [
    filtro,
    edificios
  ]);
}
