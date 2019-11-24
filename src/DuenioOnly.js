import React from 'react';
import { useSessionContext } from './SessionContext';

export default function DuenioOnly({ children }) {
  const { isDuenio } = useSessionContext();

  return <>{isDuenio() && children}</>;
}
