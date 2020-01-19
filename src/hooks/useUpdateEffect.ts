import React, { useEffect, useRef } from 'react';

function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
) {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (effect) {
      return effect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useUpdateEffect;
