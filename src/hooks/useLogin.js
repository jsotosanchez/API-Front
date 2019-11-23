import { useState } from 'react';
import { useSessionContext } from '../SessionContext';
import { postToServer } from '../http';

export function useLogin() {
  const [persona, setPersona] = useState(null);
  const context = useSessionContext();

  function logIn(tipoUsuario, documento, password) {
    const post = async () => {
      const url = `http://localhost:8080/login/`;
      const data = await postToServer(url, { tipoUsuario, documento, password }, context);
      const dataAsJson = await data.json();
      return dataAsJson;
    };
    if (documento) {
      post()
        .then(setPersona)
        .catch(() => setPersona(null));
    }
  }
  return { persona, logIn };
}
