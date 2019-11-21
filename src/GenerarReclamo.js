import React from 'react';

export default function GenerarReclamo() {
  return (
    <div className="modal">
      <button className="close">X</button>
      <div className="modal-content">
        <form>
          <label>
            Edificio:
            <input type="text" name="filtro" placeholder="nombre o doc" />
          </label>
          <label>
            Piso:
            <input type="number" name="filtro" placeholder="1" />
          </label>
          <label>
            Numero de unidad:
            <input type="number" name="filtro" placeholder="5" />
          </label>
          <label>
            Documento:
            <input type="text" name="filtro" placeholder="DNI12345" />
          </label>
          <label>
            Ubicación:
            <input type="text" name="filtro" placeholder="Cocina" />
          </label>
          <label>
            Descripción:
            <textarea name="filtro" placeholder="Hay una gotera" />
          </label>
          <button className="button">Generar</button>
          <button className="button">Cancelar</button>
        </form>
      </div>
    </div>
  );
}
