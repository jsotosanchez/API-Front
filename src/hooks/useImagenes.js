import { useState, useEffect } from 'react';
import { useFetchConToast } from './useHttp';

export function useImagenes(id) {
  const [imagenes, setImagenes] = useState([]);
  const fetch = useFetchConToast();

  useEffect(() => {
    let callback = true;

    if (!imagenes.length)
      fetch(`http://localhost:8080/reclamos/${id}/imagenes`).then(data => callback && setImagenes(data));

    return () => {
      callback = false;
    };
  }, [fetch, imagenes, id]);

  return imagenes;
}
