import { useState, useEffect, useMemo } from 'react';

/**
 *
 * @param {function(): Promise<[object]>} fetchPersonas
 * @param {string} filtro
 */
function usePersonas(fetchPersonas, filtro) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    let callback = true;

    if (!personas.length) fetchPersonas().then(data => callback && setPersonas(data));

    return () => {
      callback = false;
    };
  }, [fetchPersonas, filtro, personas]);

  return personas;
}

/**
 *
 * @param {function():Promise<[object]>} fetchPersonas
 * @param {string} filtro
 */
export function useFiltrarPersonas(fetchPersonas, filtro) {
  const personas = usePersonas(fetchPersonas, filtro);

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
