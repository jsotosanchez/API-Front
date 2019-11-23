import { createContext, useContext, useState } from 'react';

export const SessionContext = createContext({});

export const useSessionContext = () => {
  return useContext(SessionContext);
};

export const TIPO_USUARIO = {
  USUARIO: 'usuario',
  ADMINISTRADOR: 'administrador'
};

/**
 * @typedef {{
 * documento: string,
 * tipoUsuario: string
 * }} State
 * @type {State}
 */
export const initialState = {
  documento: '',
  tipoUsuario: ''
};

/**
 *  @typedef{{
 *  estado: State,
 *  setDocumento : (documento: string)=> void,
 *  setTipoUsuario : (tipo: string)=> void,
 *  isLoggedIn: ()=> boolean
 * }} SessionContext
 */

/**
 * @return {SessionContext}
 */
export function useContextoSesion() {
  const [estado, setSession] = useState(initialState);

  /**
   * @param {string} documento
   */
  function setDocumento(documento) {
    setSession(estado => ({ ...estado, documento }));
  }

  /**
   * @param {'administrador' | 'usuario'} tipoUsuario
   */
  function setTipoUsuario(tipoUsuario) {
    setSession(estado => ({ ...estado, tipoUsuario }));
  }

  function isLoggedIn() {
    console.log('isLoggedIn', Boolean(estado.documento), estado);
    return Boolean(estado.documento);
  }

  return {
    estado,
    setDocumento,
    setTipoUsuario,
    isLoggedIn
  };
}
