import React, { useState } from 'react';

import { useLogin } from './hooks/useLogin';

export default function Login() {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useLogin();

  const handleDocumento = event => {
    setDocumento(event.target.value);
  };

  const handlePass = event => {
    setPassword(event.target.value);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    logIn(documento, password);
  };

  return (
    <form className="form login" onSubmit={handleSubmitForm}>
      <div className="form-row">
        <div className="form-group">
          <label className="texto-blanco">
            Documento
            <input type="text" className="form-control" placeholder="CPA3449614/admin" onBlur={handleDocumento} />
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="texto-blanco">
            Contraseña
            <input type="password" className="form-control" placeholder="*****" onBlur={handlePass} />
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
