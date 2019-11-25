import React, { useState } from 'react';
import { useFiltrarPersonas } from './hooks/usePersonas';
import CardPersona from './CardPersona';

export default function ListaPersonas({ fetchPersonas, labelClass }) {
  const [filtro, setFiltro] = useState('');
  const personas = useFiltrarPersonas(fetchPersonas, filtro);

  const handleInputFiltro = event => setFiltro(event.target.value);

  const inputStyle = {
    marginLeft: '15px'
  };

  return (
    <div className="form">
      <div className="form-row">
        <label className={labelClass}>
          Buscar:
          <input style={inputStyle} type="text" name="filtro" placeholder="nombre o doc" onChange={handleInputFiltro} />
        </label>
      </div>
      <div className="lista-unidades">
        {personas.map((u, i) => (
          <CardPersona key={i} documento={u.documento} nombre={u.nombre} />
        ))}
      </div>
    </div>
  );
}
