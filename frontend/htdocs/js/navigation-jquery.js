(() => {
  const setActiveCSSClassToNavigationLinks = selector => {
    const navLiElements = $(selector);

    navLiElements.each((index, liElement) => {
      const anchorElement = $('a', liElement);
      const href = anchorElement.attr('href');
      const pathname = document.location.pathname;

      if (href === pathname) {
        $(liElement).addClass('uk-active');
      }
    });
  }

  setActiveCSSClassToNavigationLinks('#navigation-header li');
  setActiveCSSClassToNavigationLinks('#navigation-footer li');
})();
