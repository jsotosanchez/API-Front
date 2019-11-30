import { useFetch } from './useFetch';

export function useImagenes(id) {
  const url = `http://localhost:8080/reclamos/${id}/imagenes`;
  const { data: imagenes, refresh } = useFetch([], url);
  return { imagenes, refresh };
}
