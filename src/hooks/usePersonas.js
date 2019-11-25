import { useState, useEffect, useMemo } from 'react';
import { useFetchConToast } from './useHttp';

function usePersonas() {
  const fetchConToast = useFetchConToast();
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    let callback = true;

    if (!personas.length)
      fetchConToast(`http://localhost:8080/personas`).then(data => {
        console.log(data);
        return callback && setPersonas(data);
      });

    return () => {
      callback = false;
    };
  }, [fetchConToast, personas]);

  return personas;
}

/**
 *
 * @param {string} filtro
 */
export function useFiltrarPersonas(filtro) {
  const personas = usePersonas();

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
