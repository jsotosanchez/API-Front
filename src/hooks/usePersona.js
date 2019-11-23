import { useState, useEffect } from 'react';
import { useSessionContext } from '../SessionContext';
import { fetchToServer } from '../http';

export function usePersona() {
  const [persona, setPersona] = useState({});
  const [documento, setDocumento] = useState('');
  const context = useSessionContext();

  useEffect(() => {
    const fetchPersona = async () => {
      const url = `http://localhost:8080/personas/${documento}`;
      const data = await fetchToServer(url, context);
      const dataAsJson = await data.json();
      return dataAsJson;
    };
    if (documento) {
      fetchPersona()
        .then(setPersona)
        .catch(() => setPersona({}));
    }
    return () => undefined;
  }, [documento, context]);

  return { persona, setDocumento };
}
