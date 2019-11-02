import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <h2 key={i.codigo}>
          <Link to={`detalleEdificio/${i.nombre}`}>{i.nombre}</Link>
        </h2>
      ))}
    </div>
  );
}
