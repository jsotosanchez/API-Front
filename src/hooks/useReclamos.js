import { useState, useEffect, useMemo } from 'react';

/**
 *
 * @param {function(): Promise} fetchReclamos
 * @param {string} estado
 * @param {string} filtroUsuario
 */
function useReclamos(fetchReclamos, estado, filtroUsuario) {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    let callback = true;

    if (!reclamos.length) fetchReclamos().then(data => callback && setReclamos(data));
    return () => (callback = false);
  }, [fetchReclamos, estado, filtroUsuario, reclamos]);

  return reclamos;
}

export function useFiltrarReclamos(fetchReclamos, estado, filtroUsuario) {
  const reclamos = useReclamos(fetchReclamos, estado, filtroUsuario);
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
