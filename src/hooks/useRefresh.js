import { useState, useMemo } from 'react';

export function useRefresh() {
  const [refreshId, setRefresh] = useState(0);
  const refresh = useMemo(() => () => setRefresh(refreshId + 1), []);

  return { refreshId, refresh };
}
