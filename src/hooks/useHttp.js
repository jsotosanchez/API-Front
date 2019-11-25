import { useSessionContext } from '../SessionContext';
import { ToastsStore } from 'react-toasts';
import { fetchToServer, postToServer, deleteToServer, patchToServer } from '../http';

/**@return {function(string): Promise} */
export function useFetchConToast() {
  const contexto = useSessionContext();

  return async url => {
    return fetchToServer(url, contexto).catch(e => {
      ToastsStore.error('Se genero un error');
    });
  };
}

export function usePostConToast() {
  const contexto = useSessionContext();

  return post;
  /**
   *  @param {string} url
   *  @param {object} body
   */
  async function post(url, body) {
    return postToServer(url, body, contexto)
      .then(async r => {
        if (r.status === 200) {
          ToastsStore.success('Se realizó con exito!');
          return r.json().catch(() => Promise.resolve({}));
        } else {
          return Promise.reject(r);
        }
      })
      .catch(r => {
        ToastsStore.error('Se genero un error');
        return Promise.reject(r);
      });
  }
}

export function useDeleteConToast() {
  const contexto = useSessionContext();

  return del;
  /**
   *  @param {string} url
   *  @param {object} body
   */
  async function del(url, body) {
    return deleteToServer(url, body, contexto)
      .then(async r => {
        if (r.status === 200) {
          ToastsStore.success('Se realizó con exito!');
          return r.json().catch(() => Promise.resolve({}));
        } else {
          return Promise.reject(r);
        }
      })
      .catch(r => {
        ToastsStore.error('Se genero un error');
        return Promise.reject(r);
      });
  }
}

export function usePatchConToast() {
  const contexto = useSessionContext();

  return patch;
  /**
   *  @param {string} url
   *  @param {object} body
   */
  async function patch(url, body) {
    return patchToServer(url, body, contexto)
      .then(async r => {
        if (r.status === 200) {
          ToastsStore.success('Se realizó con exito!');
          return r.json().catch(() => Promise.resolve({}));
        } else {
          return Promise.reject(r);
        }
      })
      .catch(r => {
        ToastsStore.error('Se genero un error');
        return Promise.reject(r);
      });
  }
}
