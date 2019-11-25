import React, { useState } from 'react';
import ListaPersonas from './ListaPersonas';

/**
 *
 * @param {object} props
 * @param {any[]} props.personas
 * @param {string} props.tipoPersona
 * @param {function(string, string): void} props.addPersona
 */
export default function PersonasDeUnidad({ personas, tipoPersona, addPersona }) {
  const [documento, setDocumento] = useState('');
  const handleInput = event => setDocumento(event.target.value);

  return (
    <div>
      <form
        className="form"
        onSubmit={event => {
          event.preventDefault();
          addPersona(tipoPersona, documento);
        }}
      >
        <input type="text" name="documento" placeholder="Documento a agregar" onChange={handleInput} />
        <button type="submit" className="button">
          Agregar
        </button>
      </form>
      <ListaPersonas personas={personas} labelClass="" setFiltro={() => {}} />
    </div>
  );
}
