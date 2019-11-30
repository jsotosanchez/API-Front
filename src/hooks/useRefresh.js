import { useState, useMemo } from 'react';

export function useRefresh() {
  const [refreshId, setRefresh] = useState(0);
  // eslint-disable-next-line
  const refresh = useMemo(() => () => setRefresh(refreshId + 1), []);

  return { refreshId, refresh };
}
