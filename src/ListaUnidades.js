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

function useFiltrarUnidades(id, filtroSoloDisponible, piso) {
  const unidades = useUnidades(id);
  return useMemo(() => unidades.filter(e => e.habitado !== filtroSoloDisponible && (!piso || e.piso === piso)), [
    filtroSoloDisponible,
    unidades,
    piso
  ]);
}

export default function ListaUnidades({ id }) {
  const [verSoloDisponibles, setVerSoloDisponibles] = useState(true);
  const [piso, setPiso] = useState(null);
  const unidades = useFiltrarUnidades(id, verSoloDisponibles, piso);

  const filtrarHabitadas = () => {
    setVerSoloDisponibles(!verSoloDisponibles);
  };

  const handleInputPiso = event => setPiso(event.target.value);
  return (
    <div>
      <label>
        Piso:
        <input type="number" name="piso" placeholder="" onChange={handleInputPiso} />
      </label>
      <button className="button" onClick={() => filtrarHabitadas()}>
        {verSoloDisponibles ? 'Ver no disponibles' : 'Ver disponibles'}
      </button>
      <div className="lista-unidades">
        {unidades.map(u => (
          <CardUnidad key={u.id} piso={u.piso} numero={u.numero} className="card-unidad" />
        ))}
      </div>
    </div>
  );
}
