import { useMemo } from 'react';
import { useFetch } from './useFetch';

export function usePersonas(url = `http://localhost:8080/personas`) {
  const { data: personas, refresh } = useFetch([], url);
  return { personas, refresh };
}

/**
 *
 * @param {string} filtro
 * @param {string =} url
 */
export function useFiltrarPersonas(filtro, url) {
  const { personas, refresh } = usePersonas(url);

  const personasFiltradas = useMemo(() => {
    return personas.filter(
      e =>
        e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        e.documento.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [personas, filtro]);

  return { personas: personasFiltradas, refresh };
}
