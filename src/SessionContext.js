import { createContext, useContext, useState } from 'react';

export const SessionContext = createContext({});

export const useSessionContext = () => {
  return useContext(SessionContext);
};

const initialState = {
  documento: ''
};

export function useContextoSesion() {
  const [estado, setSession] = useState(initialState);

  /**
   * @param {string} documento
   */
  function setDocumento(documento) {
    setSession({ documento });
  }

  const contexto = {
    estado,
    setDocumento
  };
  return contexto;
}
