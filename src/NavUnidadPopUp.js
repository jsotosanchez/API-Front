import React from 'react';
import { Link } from 'react-router-dom';

export default function NavUnidadPopUp({ url, habitado, liberar }) {
  const handleClick = event => {
    liberar();
  };
  return (
    <nav>
      <ul className="nav-links">
        <Link to={`${url}/inquilinos`} className="link">
          <li>Inquilinos</li>
        </Link>
        <Link to={`${url}/duenios`} className="link">
          <li>Duenios</li>
        </Link>
        <Link to={`${url}/reclamos`} className="link">
          <li>Reclamos</li>
        </Link>
        {
          <Link to={`${url}/transferir`} className="link">
            <li>Transferir</li>
          </Link>
        }
        {!habitado && (
          <Link to={`${url}/alquilar`} className="link">
            <li>Alquilar</li>
          </Link>
        )}
      </ul>
      <ul className="nav-buttons">
        {habitado && (
          <button onClick={handleClick} className="button">
            Liberar
          </button>
        )}
      </ul>
    </nav>
  );
}
