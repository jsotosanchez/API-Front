import { useState, useEffect } from 'react';

const fetchUnidad = async id => {
  const data = await fetch(`http://localhost:8080/unidades/${id}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

export function useUnidad(id) {
  const [unidad, setUnidad] = useState(null);

  useEffect(() => {
    fetchUnidad(id).then(setUnidad);
    return () => undefined;
  }, [id]);

  return unidad;
}
