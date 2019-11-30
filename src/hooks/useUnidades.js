import { useMemo } from 'react';
import { useFetch } from './useFetch';

/**
 *
 * @param {string} id
 */
function useUnidades(id) {
  const url = `http://localhost:8080/edificios/${id}/unidades`;
  const { data: unidades } = useFetch([], url);
  return { unidades };
}

/**
 *
 * @param {string} id
 * @param {boolean} filtroSoloDisponible
 * @param {string} piso
 */
export function useFiltrarUnidades(id, filtroSoloDisponible, piso) {
  const { unidades } = useUnidades(id);
  const unidadesFiltradas = useMemo(
    () => unidades.filter(e => e.habitado !== filtroSoloDisponible && (!piso || e.piso === piso)),
    [filtroSoloDisponible, unidades, piso]
  );
  return { unidades: unidadesFiltradas };
}
