import React, { useState } from 'react';
import classNames from 'classnames';
import ListaUnidades from './ListaUnidades';
import ListaInquilinos from './ListaInquilinos';
import ListaDuenios from './ListaDuenios';
import ListaHabilitados from './ListaHabilitados';
import ListaReclamos from './ListaReclamos';

export default function DetalleEdificio({ id, nombre }) {
  const [verUnidades, setVerUnidades] = useState(true);
  const [verInquilinos, setVerInquilinos] = useState(false);
  const [verDuenios, setVerDuenios] = useState(false);
  const [verHabilitados, setVerHabilitados] = useState(false);
  const [verReclamos, setVerReclamos] = useState(false);

  const mostrarUnidades = () => {
    setVerUnidades(true);
    setVerInquilinos(false);
    setVerDuenios(false);
    setVerHabilitados(false);
    setVerReclamos(false);
  };

  const mostrarInquilinos = () => {
    setVerUnidades(false);
    setVerInquilinos(true);
    setVerDuenios(false);
    setVerHabilitados(false);
    setVerReclamos(false);
  };

  const mostrarDuenios = () => {
    setVerUnidades(false);
    setVerInquilinos(false);
    setVerDuenios(true);
    setVerHabilitados(false);
    setVerReclamos(false);
  };

  const mostrarHabilitados = () => {
    setVerUnidades(false);
    setVerInquilinos(false);
    setVerDuenios(false);
    setVerHabilitados(true);
    setVerReclamos(false);
  };

  const mostrarReclamos = () => {
    setVerUnidades(false);
    setVerInquilinos(false);
    setVerDuenios(false);
    setVerHabilitados(false);
    setVerReclamos(true);
  };

  return (
    <div>
      <h2>{nombre}</h2>
      <ul className="nav-buttons">
        <li>
          <button className={classNames('button', { 'button-clicked': verUnidades })} onClick={() => mostrarUnidades()}>
            Unidades
          </button>
        </li>
        <li>
          <button
            className={classNames('button', { 'button-clicked': verInquilinos })}
            onClick={() => mostrarInquilinos()}
          >
            Inquilinos
          </button>
        </li>
        <li>
          <button className={classNames('button', { 'button-clicked': verDuenios })} onClick={() => mostrarDuenios()}>
            Duenios
          </button>
        </li>
        <li>
          <button
            className={classNames('button', { 'button-clicked': verHabilitados })}
            onClick={() => mostrarHabilitados()}
          >
            Habilitados
          </button>
        </li>
        <li>
          <button className={classNames('button', { 'button-clicked': verReclamos })} onClick={() => mostrarReclamos()}>
            Reclamos
          </button>
        </li>
      </ul>
      {verUnidades ? <ListaUnidades id={id} /> : ''}
      {verInquilinos ? <ListaInquilinos id={id} /> : ''}
      {verDuenios ? <ListaDuenios id={id} /> : ''}
      {verHabilitados ? <ListaHabilitados id={id} /> : ''}
      {verReclamos ? <ListaReclamos id={id} /> : ''}
    </div>
  );
}
