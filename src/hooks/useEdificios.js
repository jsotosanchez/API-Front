import { useMemo } from 'react';
import { useFetch } from './useFetch';

export function useEdificios() {
  const url = 'http://localhost:8080/edificios';
  const { data: edificios, refresh } = useFetch([], url);
  return { edificios, refresh };
}
/**
 *
 * @param {string} filtro
 */
export function useFiltrarEdificios(filtro) {
  const { edificios, refresh } = useEdificios();

  const edificiosFiltrados = useMemo(
    () => edificios.filter(e => e.nombre.toLowerCase().includes(filtro.toLowerCase())),
    [filtro, edificios]
  );

  return { edificios: edificiosFiltrados, refresh };
}
