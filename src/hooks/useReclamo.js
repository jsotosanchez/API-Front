import { useState, useEffect } from 'react';

const fetchReclamo = async id => {
  const data = await fetch(`http://localhost:8080/reclamos/${id}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

export function useReclamo(id) {
  const [reclamo, setReclamo] = useState([]);

  useEffect(() => {
    fetchReclamo(id).then(setReclamo);
    return () => undefined;
  }, [id]);

  return reclamo;
}
