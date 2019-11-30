import React from 'react';
import ListaReclamos from './ListaReclamos';

export default function Reclamos({ match }) {
  const url = 'http://localhost:8080/reclamos';

  return (
    <div>
      <ListaReclamos match={match} url={url} labelClass="texto-blanco" hacerReclamo={true} />
    </div>
  );
}
