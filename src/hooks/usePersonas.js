import { useState, useEffect, useMemo } from 'react';

const fetchPersonas = async (id, tipoPersona) => {
  const data = await fetch(`http://localhost:8080/edificios/${id}/${tipoPersona}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function usePersonas(id, tipoPersona) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetchPersonas(id, tipoPersona).then(setPersonas);
    return () => undefined;
  }, [id, tipoPersona]);

  return personas;
}

export function useFiltrarPersonas(id, filtro, tipoPersona) {
  const personas = usePersonas(id, tipoPersona);

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
