import { useState, useEffect, useMemo } from 'react';
import { useFetchConToast } from './useHttp';

function usePersonas() {
  const [refreshId, setRefresh] = useState(0);
  const fetchConToast = useFetchConToast();
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    let callback = true;

    fetchConToast(`http://localhost:8080/personas`).then(data => {
      return callback && setPersonas(data);
    });

    return () => {
      callback = false;
    };
  }, [fetchConToast, refreshId]);

  const refresh = useMemo(() => setRefresh(refreshId + 1), []);

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
