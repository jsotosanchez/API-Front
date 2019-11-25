import React from 'react';
import CardPersona from './CardPersona';

/**
 *
 * @param {{
 * personas: any[],
 * labelClass: string,
 * setFiltro: function(string): void
 * }} props
 */
export default function ListaPersonas({ personas, labelClass, setFiltro }) {
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
