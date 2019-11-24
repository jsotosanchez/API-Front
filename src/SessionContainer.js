import React, { useState } from 'react';
import { SessionContext, initialState, TIPO_USUARIO } from './SessionContext';

/**
 *
 * @param {{children?: any}} props
 */
export default function SessionContainer({ children }) {
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
    return Boolean(estado.documento);
  }

  function isAdmin() {
    return isLoggedIn() && Boolean(estado.tipoUsuario === TIPO_USUARIO.ADMINISTRADOR);
  }

  function isDuenio() {
    return (
      isLoggedIn() &&
      (Boolean(estado.tipoUsuario === TIPO_USUARIO.DUENIO) ||
        Boolean(estado.tipoUsuario === TIPO_USUARIO.ADMINISTRADOR))
    );
  }

  /**
   * @type {import('./SessionContext').SessionContext}
   */
  const contexto = {
    estado,
    setDocumento,
    setTipoUsuario,
    isLoggedIn,
    isAdmin,
    isDuenio
  };
  return <SessionContext.Provider value={contexto}>{children}</SessionContext.Provider>;
}
