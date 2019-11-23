import React from 'react';
import { useSessionContext } from './SessionContext';

export default function AdminOnly({ children }) {
  const { isAdmin } = useSessionContext();

  return <>{isAdmin() && children}</>;
}
