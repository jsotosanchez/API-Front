import { createContext, useContext } from 'react';

/**
 *  @typedef{{
 *  estado: State,
 *  setDocumento : (documento: string)=> void,
 *  setTipoUsuario : (tipo: string)=> void,
 *  isLoggedIn: ()=> boolean
 * }} SessionContext
 */

/**
 * @type {React.Context<SessionContext>}
 */
export const SessionContext = createContext(undefined);

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
