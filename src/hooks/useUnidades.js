import { useState, useEffect, useMemo } from 'react';

const fetchUnidades = async id => {
  const data = await fetch(`http://localhost:8080/edificios/${id}/unidades`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function useUnidades(id) {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    fetchUnidades(id).then(setUnidades);
    return () => undefined;
  }, [id]);

  return unidades;
}

export function useFiltrarUnidades(id, filtroSoloDisponible, piso) {
  const unidades = useUnidades(id);
  return useMemo(() => unidades.filter(e => e.habitado !== filtroSoloDisponible && (!piso || e.piso === piso)), [
    filtroSoloDisponible,
    unidades,
    piso
  ]);
}
