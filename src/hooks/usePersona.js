import { useState, useEffect } from 'react';

export function usePersona() {
  const [persona, setPersona] = useState({});
  const [documento, setDocumento] = useState('');

  useEffect(() => {
    const fetchPersona = async () => {
      const data = await fetch(`http://localhost:8080/personas/${documento}`);
      if (data.status >= 400) {
        throw new Error(await data.json());
      }
      const dataAsJson = await data.json();
      return dataAsJson;
    };
    if (documento) {
      fetchPersona()
        .then(setPersona)
        .catch(() => setPersona({}));
    }
    return () => undefined;
  }, [documento]);

  return { persona, setDocumento };
}
