import { useState } from 'react';
import { usePostConToast } from '../hooks/useHttp';

export function useLogin() {
  const [persona, setPersona] = useState(null);
  const post = usePostConToast();

  function logIn(tipoUsuario, documento, password) {
    if (documento) {
      post(`http://localhost:8080/login/`, { tipoUsuario, documento, password })
        .then(setPersona)
        .catch(() => setPersona(null));
    }
  }
  return { persona, logIn };
}
