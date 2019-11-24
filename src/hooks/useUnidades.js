import { useState, useEffect, useMemo } from 'react';
import { fetchToServer } from '../http';
import { useSessionContext } from '../SessionContext';

function useUnidades(id) {
  const [unidades, setUnidades] = useState([]);
  const contexto = useSessionContext();

  useEffect(() => {
    fetchToServer(`http://localhost:8080/edificios/${id}/unidades`, contexto).then(setUnidades);
    return () => undefined;
  }, [id, contexto]);

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
