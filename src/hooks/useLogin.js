import { usePostConToast } from '../hooks/useHttp';
import { useSessionContext } from '../SessionContext';

/**
 * @typedef {{
 * documento: string,
 * tipoUsuario: string
 * }} Usuario
 */

export function useLogin() {
  const post = usePostConToast();
  const sessionContext = useSessionContext();

  /**
   *
   * @param {String} documento
   * @param {String} password
   */
  function logIn(documento, password) {
    if (documento) {
      post(`http://localhost:8080/login/`, { documento, password })
        .then(r => handleLogIn(r))
        .catch(e => handleLogIn({ documento: '', tipoUsuario: '' }));
    }
  }
  return logIn;

  /**
   *
   * @param {Usuario} usuario
   */
  function handleLogIn(usuario) {
    sessionContext.setDocumento(usuario.documento);
    sessionContext.setTipoUsuario(usuario.tipoUsuario);
  }
}
