import React, { useEffect, useRef } from 'react';

import { canUseDOM } from '@utils/common';

import * as S from './Preloader.style';

declare global {
  interface Window {
    isPreloaderHidden: boolean | undefined;
  }
}

function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const isEnabled = process.env.REACT_APP_SPLASHSCREEN_ENABLED;
  const isHidden = canUseDOM() && window.isPreloaderHidden;

  useEffect(() => {
    if (!isEnabled) return;

    const preloaderElem = preloaderRef.current;
    if (!preloaderElem) return;

    if (document.readyState !== 'loading') hidePreloader();
    else document.addEventListener('DOMContentLoaded', handleDomContentLoading);

    function handleDomContentLoading() {
      document.removeEventListener('DOMContentLoaded', handleDomContentLoading);
      hidePreloader();
    }

    function hidePreloader() {
      if (!preloaderElem) return false;

      preloaderElem.addEventListener('animationend', handleAnimationEnd);
      preloaderElem.classList.add('hidden');

      function handleAnimationEnd(event: AnimationEvent) {
        const { target, currentTarget } = event;

        if (target !== currentTarget) return false;
        if (!preloaderElem) return false;

        preloaderElem.removeEventListener('animationend', handleAnimationEnd);

        preloaderElem.style.display = 'none';
        preloaderElem.classList.remove('hidden');

        window.isPreloaderHidden = true;
      }
    }
  });

  if (!isEnabled || isHidden) {
    return null;
  }

  return (
    <S.Container ref={preloaderRef}>
      <S.Inner>
        <S.Item />
        <S.Item />
      </S.Inner>
    </S.Container>
  );
}

export default Preloader;
