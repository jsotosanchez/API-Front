import React, { useState, useEffect, useMemo } from 'react';
import CardUnidad from './CardUnidad';

function useUnidades(id) {
  const [unidades, setUnidades] = useState([]);

  const fetchUnidades = async () => {
    const data = await fetch(`http://localhost:8080/edificios/${id}/unidades`);
    const dataAsJson = await data.json();
    return dataAsJson;
  };

  useEffect(() => {
    fetchUnidades().then(setUnidades);
    return () => undefined;
  }, [id]);

  return unidades;
}

function useFiltrarUnidades(id, filtroSoloDisponible) {
  const unidades = useUnidades(id);
  return useMemo(() => unidades.filter(e => e.habitado !== filtroSoloDisponible), [filtroSoloDisponible, unidades]);
}

export default function DetalleEdificio({ id, nombre }) {
  const [verUnidades, setVerUnidades] = useState(true);
  const [verSoloDisponibles, setVerSoloDisponibles] = useState(true);
  const unidades = useFiltrarUnidades(id, verSoloDisponibles);

  const mostrarUnidades = event => {
    setVerUnidades(!verUnidades);
  };

  const filtrarHabitadas = event => {
    setVerSoloDisponibles(!verSoloDisponibles);
  };

  return (
    <div>
      <h2>{nombre}</h2>
      <button className="button" onClick={() => mostrarUnidades()}>
        Unidades
      </button>
      {verUnidades ? (
        <div>
          <button className="button" onClick={() => filtrarHabitadas()}>
            {verSoloDisponibles ? 'Ver no disponibles' : 'Ver disponibles'}
          </button>
          <div className="lista-unidades">
            {unidades.map(u => (
              <CardUnidad key={u.id} nroUnidad={u.id} />
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
