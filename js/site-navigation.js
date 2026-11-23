const navigation = document.querySelector('#primary-navigation');
const menuButton = document.querySelector('.menu-btn');

if (navigation && menuButton) {
  const drawerHeader = document.createElement('div');
  drawerHeader.className = 'nav-drawer-header';

  const heading = document.createElement('h2');
  heading.textContent = 'NHA';

  const closeButton = document.createElement('button');
  closeButton.className = 'nav-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close navigation menu');
  closeButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

  drawerHeader.append(heading, closeButton);
  navigation.prepend(drawerHeader);
  navigation.setAttribute('aria-label', 'NHA');

  const backdrop = document.createElement('button');
  backdrop.className = 'nav-backdrop';
  backdrop.type = 'button';
  backdrop.setAttribute('aria-label', 'Close navigation menu');
  backdrop.hidden = true;
  document.body.append(backdrop);

  const setMenuOpen = (isOpen, restoreFocus = true) => {
    navigation.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    backdrop.hidden = !isOpen;
    document.body.classList.toggle('nav-open', isOpen);

    if (isOpen) closeButton.focus();
    else if (restoreFocus) menuButton.focus();
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  closeButton.addEventListener('click', () => setMenuOpen(false));
  backdrop.addEventListener('click', () => setMenuOpen(false));

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false, false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      setMenuOpen(false);
    }
  });
}
