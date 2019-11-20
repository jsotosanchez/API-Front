import React, { useState } from 'react';

/**
 *
 * @param {{codigo:string, piso: string, numero: string, alquilar: function}} props
 */
export default function UnidadAlquilar({ codigo, piso, numero, alquilar }) {
  const [documento, setDocumento] = useState('');
  const handleInput = event => setDocumento(event.target.value);

  const handleSubmit = () => {
    alquilar(documento);
  };

  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input type="text" name="documento" placeholder="documento" onChange={handleInput} />
        <button type="submit" className="button">
          Alquilar
        </button>
      </form>
    </div>
  );
}
