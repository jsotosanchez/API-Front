import { useState, useEffect, useMemo } from 'react';

const fetchReclamos = async id => {
  const data = await fetch(`http://localhost:8080/edificios/${id}/reclamos`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

function useReclamos(id) {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    fetchReclamos(id).then(setReclamos);
    return () => undefined;
  }, [id]);

  return reclamos;
}

export function useFiltrarReclamos(id, estado, filtroUsuario) {
  const reclamos = useReclamos(id);
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
