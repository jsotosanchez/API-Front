import { useState, useEffect } from 'react';

const fetchEdificio = async id => {
  const data = await fetch(`http://localhost:8080/edificios/${id}`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

export function useEdificio(id) {
  const [edificio, setEdificio] = useState({ nombre: '' });

  useEffect(() => {
    fetchEdificio(id).then(setEdificio);
    return () => undefined;
  }, [id]);

  return edificio;
}
