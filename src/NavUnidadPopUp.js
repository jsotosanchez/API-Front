import React from 'react';
import { Link } from 'react-router-dom';

export default function NavUnidadPopUp({ url }) {
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
        <Link to={`${url}/alquilar`} className="link">
          <li>Alquilar</li>
        </Link>
      </ul>
      <ul className="nav-buttons">
        <button className="button">LIBERAR</button>
      </ul>
    </nav>
  );
}
