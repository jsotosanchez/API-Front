import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const style = {
    color: 'black'
  };
  return (
    <div>
      <nav>
        <ul className="nav-links">
          <Link to="/edificios">
            <li style={style}>Edificios</li>
          </Link>
          <Link to="/reclamos">
            <li style={style}>Reclamos</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
