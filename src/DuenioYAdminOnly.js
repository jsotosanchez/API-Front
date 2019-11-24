import React from 'react';
import { useSessionContext } from './SessionContext';

export default function DuenioYAdminOnly({ children }) {
  const { isDuenio } = useSessionContext();

  return <>{isDuenio() && children}</>;
}
