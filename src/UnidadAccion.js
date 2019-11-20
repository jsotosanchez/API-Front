import React, { useState } from 'react';

/**
 *
 * @param {{accion: function, textoBoton: string}} props
 */
export default function UnidadAccion({ accion, textoBoton }) {
  const [documento, setDocumento] = useState('');
  const handleInput = event => setDocumento(event.target.value);

  const handleSubmit = () => {
    accion(documento);
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
          {textoBoton}
        </button>
      </form>
    </div>
  );
}
