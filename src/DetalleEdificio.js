import React, { useState } from 'react';
import classNames from 'classnames';
import ListaUnidades from './ListaUnidades';

export default function DetalleEdificio({ id, nombre }) {
  const [verUnidades, setVerUnidades] = useState(true);

  const mostrarUnidades = () => {
    setVerUnidades(!verUnidades);
  };

  return (
    <div>
      <h2>{nombre}</h2>
      <button className={classNames('button', { 'button-clicked': verUnidades })} onClick={() => mostrarUnidades()}>
        Unidades
      </button>
      {verUnidades ? <ListaUnidades id={id} /> : ''}
    </div>
  );
}
