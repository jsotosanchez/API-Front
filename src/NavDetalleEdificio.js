import React from 'react';
import { Link } from 'react-router-dom';

export default function NavDetalleEdificio({ url }) {
  const navStyle = {
    width: '100%'
  };
  return (
    <nav>
      <ul className="nav-links" style={navStyle}>
        <Link to={`${url}/unidades`} className="link">
          <li>Unidades</li>
        </Link>
        <Link to={`${url}/inquilinos`} className="link">
          <li>Inquilinos</li>
        </Link>
        <Link to={`${url}/duenios`} className="link">
          <li>Duenios</li>
        </Link>
        <Link to={`${url}/habilitados`} className="link">
          <li>Habilitados</li>
        </Link>
        <Link to={`${url}/reportes`} className="link">
          <li>Reportes</li>
        </Link>
      </ul>
    </nav>
  );
}
