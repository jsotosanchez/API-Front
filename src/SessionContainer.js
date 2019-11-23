import React, { useState } from 'react';
import { SessionContext, initialState } from './SessionContext';

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

  /**
   * @type {import('./SessionContext').SessionContext}
   */
  const contexto = {
    estado,
    setDocumento,
    setTipoUsuario,
    isLoggedIn
  };
  console.log('contexto', contexto);
  return <SessionContext.Provider value={contexto}>{children}</SessionContext.Provider>;
}
