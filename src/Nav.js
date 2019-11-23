import React from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from './SessionContext';

export default function Nav() {
  const { isAdmin } = useSessionContext();

  return (
    <nav>
      <ul className="nav-links">
        <Link to="/edificios">
          <li>Edificios</li>
        </Link>
        <Link to="/reclamos">
          <li>Reclamos</li>
        </Link>
        {isAdmin() && (
          <Link to="/personas">
            <li>Personas</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}
