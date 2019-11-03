import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <Link to="/edificios">
          <li>Edificios</li>
        </Link>
        <Link to="/reclamos">
          <li>Reclamos</li>
        </Link>
      </ul>
    </nav>
  );
}
