import { useSessionContext } from '../SessionContext';
import { ToastsStore } from 'react-toasts';
import { fetchToServer, postToServer } from '../http';

/**
 *
 * @param {function (object | string): void | undefined} setter
 */
export function useFetchConToast(setter) {
  const contexto = useSessionContext();

  return fetch;

  /**@param {string} url */
  async function fetch(url) {
    return fetchToServer(url, contexto)
      .then(setter)
      .catch(e => {
        ToastsStore.error('Se genero un error');
      });
  }
}

export function usePostConToast() {
  const contexto = useSessionContext();
  /**
   *  @param {string} url
   *  @param {object} body
   */
  return function post(url, body) {
    return postToServer(url, body, contexto)
      .then(r => {
        if (r.status === 200) {
          ToastsStore.success('Se realizó con exito!');
        }
      })
      .catch(r => {
        console.log('log', r);
        ToastsStore.error('Se genero un error');
      });
  };
}
