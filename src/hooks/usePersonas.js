import { useState, useEffect, useMemo } from 'react';

/**
 *
 * @param {function(): Promise} fetchPersonas
 */
function usePersonas(fetchPersonas, filtro) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetchPersonas().then(setPersonas);
    return () => undefined;
  }, [fetchPersonas, filtro]);

  return personas;
}

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
