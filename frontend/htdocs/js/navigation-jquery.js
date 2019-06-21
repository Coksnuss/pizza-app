(() => {
  const setActiveCSSClassToNavigationLinks = selector => {
    $(selector)
      .filter((index, liElement) => $('a', liElement).attr('href') === document.location.pathname)
      .addClass('uk-active');
  }

  setActiveCSSClassToNavigationLinks('#navigation-header li');
  setActiveCSSClassToNavigationLinks('#navigation-footer li');
})();
