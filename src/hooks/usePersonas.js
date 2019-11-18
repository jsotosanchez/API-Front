import { useState, useEffect, useMemo } from 'react';

function usePersonas(fetchPersonas) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetchPersonas().then(setPersonas);
    return () => undefined;
  }, [fetchPersonas]);

  return personas;
}

export function useFiltrarPersonas(fetchPersonas, filtro) {
  const personas = usePersonas(fetchPersonas);

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
