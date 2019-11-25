import { useState, useEffect, useMemo } from 'react';

/**
 *
 * @param {function(): Promise} fetchReclamos
 * @param {string} estado
 * @param {number} refresh
 */
function useReclamos(fetchReclamos, estado, refresh) {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    let callback = true;

    if (!reclamos.length) fetchReclamos().then(data => callback && setReclamos(data));
    return () => (callback = false);
  }, [fetchReclamos, estado, refresh, reclamos]);

  return reclamos;
}

export function useFiltrarReclamos(fetchReclamos, estado, filtroUsuario, refresh) {
  const reclamos = useReclamos(fetchReclamos, estado, refresh);
  return useMemo(
    () =>
      reclamos.filter(
        r =>
          r.estado.includes(estado) &&
          (r.usuario.nombre.toLowerCase().includes(filtroUsuario.toLowerCase()) ||
            r.edificio.nombre.toLowerCase().includes(filtroUsuario.toLowerCase()))
      ),
    [reclamos, estado, filtroUsuario]
  );
}
