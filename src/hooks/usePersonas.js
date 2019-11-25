import { useState, useEffect, useMemo } from 'react';
import { useFetchConToast } from './useHttp';

/**
 *
 * @param {number} refresh
 */
function usePersonas(refresh) {
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
  }, [fetchConToast, personas, refresh]);

  return personas;
}

/**
 *
 * @param {string} filtro
 * @param {number} refresh
 */
export function useFiltrarPersonas(filtro, refresh) {
  const personas = usePersonas(refresh);

  return useMemo(
    () =>
      personas.filter(
        e =>
          e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          e.documento.toLowerCase().includes(filtro.toLowerCase())
      ),
    [personas, filtro]
  );
}
