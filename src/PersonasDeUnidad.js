import React, { useState } from 'react';
import ListaPersonas from './ListaPersonas';

/**
 *
 * @param {object} props
 * @param {function():Promise} props.fetchPersonas
 * @param {string} props.tipoPersona
 * @param {function(string, string): void} props.addPersona
 */
export default function PersonasDeUnidad({ fetchPersonas, tipoPersona, addPersona }) {
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
      <ListaPersonas fetchPersonas={fetchPersonas} labelClass="" />
    </div>
  );
}
