import { useEffect, useState } from 'react';

import { useFetchConToast } from './useHttp';
import { useRefresh } from './useRefresh';

export function useFetchConRefresh(url, setter) {
  const { refreshId, refresh } = useRefresh();
  const fetchConToast = useFetchConToast();

  useEffect(() => {
    let callback = true;

    fetchConToast(url).then(data => {
      return callback && setter(data);
    });

    return () => {
      callback = false;
    };
  }, [fetchConToast, refreshId, url, setter]);

  return refresh;
}

/**
 *
 * @template T
 * @param {T} initialState
 * @param {String} url
 */
export function useFetch(initialState, url) {
  const [data, setData] = useState(initialState);
  const refresh = useFetchConRefresh(url, setData);
  return { data, refresh };
}
