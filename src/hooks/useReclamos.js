import { useMemo } from 'react';
import { useFetch } from './useFetch';

/**
 *
 * @param {string} url
 */
function useReclamos(url) {
  const { data: reclamos, refresh } = useFetch([], url);
  return { reclamos, refresh };
}

/**
 *
 * @param {string} url
 * @param {string} estado
 * @param {string} filtroUsuario
 */
export function useFiltrarReclamos(url, estado, filtroUsuario) {
  const { reclamos, refresh } = useReclamos(url);

  const reclamosFiltrados = useMemo(
    () =>
      reclamos.filter(
        r =>
          r.estado.includes(estado) &&
          (r.usuario.nombre.toLowerCase().includes(filtroUsuario.toLowerCase()) ||
            r.edificio.nombre.toLowerCase().includes(filtroUsuario.toLowerCase()))
      ),
    [reclamos, estado, filtroUsuario]
  );

  return { reclamos: reclamosFiltrados, refresh };
}
