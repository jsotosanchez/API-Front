import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useLogin } from './hooks/useLogin';
import { useSessionContext, TIPO_USUARIO } from './SessionContext';

export default function Login() {
  const [documento, setDocumento] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const history = useHistory();
  const sessionContext = useSessionContext();
  const { persona, logIn } = useLogin();

  useEffect(() => {
    if (persona) {
      sessionContext.setDocumento(documento);
      sessionContext.setTipoUsuario(tipoUsuario);

      history.replace('/edificios');
    }
    return () => {};
  }, [persona, documento, history, sessionContext, tipoUsuario]);

  const handleDocumento = event => {
    setDocumento(event.target.value);
  };

  const handleTipoUsuario = event => {
    setTipoUsuario(event.target.value);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    if (!documento || !tipoUsuario) {
      return;
      // set error
    }
    logIn(tipoUsuario, documento, '');
  };

  return (
    <form className="form login" onSubmit={handleSubmitForm}>
      <div className="form-row">
        <div className="form-group">
          <label>
            Usuario
            <input
              type="radio"
              name="tipoUsuario"
              value={TIPO_USUARIO.USUARIO}
              onChange={handleTipoUsuario}
              checked={tipoUsuario === TIPO_USUARIO.USUARIO}
            />
          </label>
          <label>
            Administrador
            <input
              type="radio"
              name="tipoUsuario"
              value={TIPO_USUARIO.ADMINISTRADOR}
              onChange={handleTipoUsuario}
              checked={tipoUsuario === TIPO_USUARIO.ADMINISTRADOR}
            />
          </label>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            Documento
            <input type="text" className="form-control" placeholder="CPA3449614/admin" onBlur={handleDocumento} />
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>
            Contraseña
            <input type="password" className="form-control" placeholder="*****" />
          </label>
        </div>
      </div>
      <div className="form-row">
        <button type="submit" className="button">
          Conectarse
        </button>
      </div>
    </form>
  );
}
