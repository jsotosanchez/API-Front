import { useState, useEffect, useMemo } from 'react';

/**
 *
 * @param {function(): Promise} fetchReclamos
 */
function useReclamos(fetchReclamos) {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    fetchReclamos().then(setReclamos);
    return () => undefined;
  }, [fetchReclamos]);

  return reclamos;
}

export function useFiltrarReclamos(fetchReclamos, estado, filtroUsuario) {
  const reclamos = useReclamos(fetchReclamos);
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
