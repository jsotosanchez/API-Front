import React from 'react';

export default function CardUnidad({ className, piso, numero }) {
  return (
    <div className={className}>
      <h5>Piso: {piso}</h5>
      <h5>Numero: {numero}</h5>
    </div>
  );
}
