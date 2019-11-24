import React from 'react';
import { Link } from 'react-router-dom';
import DuenioYAdminOnly from './DuenioYAdminOnly';
import AdminOnly from './AdminOnly';

export default function NavDetalleEdificio({ url }) {
  const navStyle = {
    width: '100%'
  };
  return (
    <nav>
      <ul className="nav-links" style={navStyle}>
        <DuenioYAdminOnly>
          <Link to={`${url}/unidades`} className="link">
            <li>Unidades</li>
          </Link>
        </DuenioYAdminOnly>
        <Link to={`${url}/inquilinos`} className="link">
          <li>Inquilinos</li>
        </Link>
        <AdminOnly>
          <Link to={`${url}/duenios`} className="link">
            <li>Duenios</li>
          </Link>
        </AdminOnly>
        <AdminOnly>
          <Link to={`${url}/habilitados`} className="link">
            <li>Habilitados</li>
          </Link>
        </AdminOnly>
        <Link to={`${url}/reclamos`} className="link">
          <li>Reclamos</li>
        </Link>
      </ul>
    </nav>
  );
}
