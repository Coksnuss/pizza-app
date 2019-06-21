(() => {
  const setActiveCSSClassToNavigationLinks = selector => {
    const navLiElements = document.querySelectorAll(selector);

    navLiElements.forEach(liElement => {
      const anchorElement = liElement.querySelector('a');
      if (anchorElement !== null) {
        const href = anchorElement.getAttribute('href');
        const pathname = document.location.pathname;

        if (href === pathname) {
          liElement.classList.add('uk-active');
        }
      }
    });
  }

  setActiveCSSClassToNavigationLinks('#navigation-header li');
  setActiveCSSClassToNavigationLinks('#navigation-footer li');
})();

