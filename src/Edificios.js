import React, { useState, useEffect } from 'react';
import CardEdificio from './CardEdificio';

export default function Edificios() {
  useEffect(() => {
    fetchEdificios();
  }, []);

  const [edificios, setEdificios] = useState([]);

  const fetchEdificios = async () => {
    const data = await fetch('http://localhost:8080/edificios');
    const dataAsJson = await data.json();

    console.log(dataAsJson);
    setEdificios(dataAsJson);
  };

  return (
    <div>
      {edificios.map(i => (
        <div className="card" key={i.codigo}>
          <CardEdificio id={i.codigo} nombre={i.nombre} direccion={i.direccion} />
        </div>
      ))}
    </div>
  );
}
