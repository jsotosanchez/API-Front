import React from 'react';
import ListaReclamos from './ListaReclamos';
import { useSessionContext } from './SessionContext';
import { fetchToServer } from './http';

export default function Reclamos({ match }) {
  const context = useSessionContext();

  const fetchReclamos = async () => {
    const d = await fetchToServer('http://localhost:8080/reclamos', context);
    return d;
  };

  return (
    <div>
      <ListaReclamos match={match} fetchReclamos={fetchReclamos} labelClass="texto-blanco" />
    </div>
  );
}
