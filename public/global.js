window.lazySizesConfig = {
  nativeLoading: {
    setLoadingAttribute: true,
    disableListeners: true
  }
};

function handleDomContentLoading() {
  document.removeEventListener('DOMContentLoaded', handleDomContentLoading);
  var preloader = document.querySelector('.js-preloader');

  function hidePreloader(event) {
    if (!preloader) return;

    var target = event.target,
      currentTarget = event.currentTarget;
    if (target !== currentTarget) return false;

    preloader.removeEventListener('animationend', hidePreloader);
    preloader.style.display = 'none';
    window.isPreloaderHidden = true;
    preloader.classList.remove('hidden');
  }

  preloader.addEventListener('animationend', hidePreloader);
  preloader.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', handleDomContentLoading);
