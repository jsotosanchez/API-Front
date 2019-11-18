import React from 'react';
import { Route } from 'react-router-dom';
import NavUnidadPopUp from './NavUnidadPopUp';
import ListaPersonas from './ListaPersonas';
import ListaReclamos from './ListaReclamos';
import PersonasDeUnidad from './PersonasDeUnidad';
import { useUnidad } from './hooks/useUnidad';

export default function UnidadPopUp({ match }) {
  const unidad = useUnidad(match.params.id);

  return (
    <div className="modal">
      <button className="close">X</button>
      <div className="modal-content">
        <NavUnidadPopUp url={match.url} />
        <Route
          path={`${match.url}/inquilinos`}
          render={() =>
            unidad && (
              <PersonasDeUnidad id={unidad.id} piso={unidad.piso} numero={unidad.numero} tipoPersona={'habitantes'} />
            )
          }
        />
        <Route
          exact
          path={`${match.url}/duenios`}
          render={() => <ListaPersonas id={match.params.id} url={'url'} tipoPersona={'duenios'} />}
        />
        <Route exact path={`${match.url}/reclamos`} render={() => <ListaReclamos id={match.params.id} />} />
      </div>
    </div>
  );
}
