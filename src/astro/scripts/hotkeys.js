const hotkeys = {
  isMac: navigator.userAgent.toLowerCase().includes('mac'),
  navActionContainer: document.querySelector('[data-nav-action-container]'),
  navActionTriggers: {
    home: document.querySelector('[data-nav-action="home"]'),
    collections: document.querySelector('[data-nav-action="collections"]'),
    omnisearch: document.querySelector('[data-nav-action="search"]'),
  },
  navActionMap: { k: 'omnisearch', j: 'collections', h: 'home' },
  handleKeyDown(e) {
    const shouldHandle = this.isMac ? e.metaKey : e.ctrlKey;
    if (shouldHandle && Object.keys(this.navActionMap).includes(e.key)) {
      this.hideHotkeys();
      e.preventDefault();
      this.triggerAction(this.navActionMap[e.key]);
    } else if (shouldHandle) {
      this.showHotkeys();
    } else {
      this.hideHotkeys();
    }
  },
  handleKeyUp(e) {
    if (e.key === 'Meta' || e.key === 'Control') {
      this.hideHotkeys();
    }
  },
  triggerAction(action) {
    this.navActionTriggers[action].click();
  },
  showHotkeys() {
    this.navActionContainer.dataset.navActionsShown = '';
  },
  hideHotkeys() {
    delete this.navActionContainer.dataset.navActionsShown;
  },
};

document.addEventListener('keydown', hotkeys.handleKeyDown.bind(hotkeys));
document.addEventListener('keyup', hotkeys.handleKeyUp.bind(hotkeys));
