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
        <div className="card" key={i.codigo}>
          <h2>{i.nombre}</h2>
          <h4>{i.direccion}</h4>
          <button>
            <Link to={`detalleEdificio/${i.nombre}`}>Ver unidades</Link>
          </button>
        </div>
      ))}
    </div>
  );
}
