import { useState, useEffect, useMemo } from 'react';

const fetchPersonas = async (id, url, tipoPersona) => {
  const data = await fetch(`${url}/${id}/${tipoPersona}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function usePersonas(id, url, tipoPersona) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetchPersonas(id, url, tipoPersona).then(setPersonas);
    return () => undefined;
  }, [id, url, tipoPersona]);

  return personas;
}

export function useFiltrarPersonas(id, filtro, url, tipoPersona) {
  const personas = usePersonas(id, url, tipoPersona);

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
