import { createContext, useContext } from 'react';

/**
 * @typedef {{
 * documento: string,
 * tipoUsuario: string
 * }} State
 
 *  @typedef{{
 *  estado: State,
 *  setDocumento : (documento: string)=> void,
 *  setTipoUsuario : (tipo: string)=> void,
 *  isLoggedIn: ()=> boolean,
 * isAdmin: ()=> boolean,
 * isDuenio: ()=> boolean
 * }} SessionContext
 */

/**
 * @type {State}
 */
export const initialState = {
  documento: '',
  tipoUsuario: ''
};

/**
 * @type {React.Context<SessionContext>}
 */
export const SessionContext = createContext(undefined);

export const useSessionContext = () => {
  return useContext(SessionContext);
};

export const TIPO_USUARIO = {
  DUENIO: 'duenio',
  INQUILINO: 'inquilino',
  ADMINISTRADOR: 'administrador'
};
