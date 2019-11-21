import React from 'react';
import ListaReclamos from './ListaReclamos';

const fetchReclamos = async () => {
  const data = await fetch(`http://localhost:8080/reclamos`);
  const dataAsJson = await data.json();
  return dataAsJson;
};

export default function Reclamos({ match }) {
  return (
    <div>
      <ListaReclamos match={match} fetchReclamos={fetchReclamos} />
    </div>
  );
}
