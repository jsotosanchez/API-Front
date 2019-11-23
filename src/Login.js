import React from 'react';

export default function Login() {
  return (
    <form className="form login">
      <div className="form-row">
        <div className="form-group">
          <label>
            Documento
            <input type="text" className="form-control" placeholder="CPA3449614/admin" />
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
        <button className="button">Conectarse</button>
      </div>
    </form>
  );
}
