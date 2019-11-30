import { useState, useMemo } from 'react';
import { useFetchConRefresh } from './useFetch';

function usePersonas() {
  const [personas, setPersonas] = useState([]);

  const refresh = useFetchConRefresh(`http://localhost:8080/personas`, setPersonas);

  return { personas, refresh };
}

/**
 *
 * @param {string} filtro
 */
export function useFiltrarPersonas(filtro) {
  const { personas, refresh: refreshPersonas } = usePersonas();

  const personasFiltradas = useMemo(() => {
    return personas.filter(
      e =>
        e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        e.documento.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [personas, filtro]);

  return { personas: personasFiltradas, refreshPersonas };
}
