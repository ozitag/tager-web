import React from 'react';

function createCtx<A>() {
  const context = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const ctx = React.useContext(context);
    if (!ctx) throw new Error('useCtx must be inside a Provider with a value');
    return ctx;
  }
  return [useCtx, context.Provider] as const;
}

export default createCtx;
