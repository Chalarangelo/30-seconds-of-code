const hotkeys = {
  isMac: navigator.userAgent.toLowerCase().includes('mac'),
  navActionContainer: document.querySelector('[data-nav-action-container]'),
  navActionTriggers: {
    home: document.querySelector('[data-nav-action="home"]'),
    collections: document.querySelector('[data-nav-action="collections"]'),
    omnisearch: document.querySelector('[data-nav-action="search"]'),
  },
  omnisearchDialog: document.querySelector('[data-modal="omnisearch"]'),
  navActionMap: { k: 'omnisearch', j: 'collections', h: 'home' },
  handleKeyDown(e) {
    const shouldHandle = this.isMac ? e.metaKey : e.ctrlKey;
    const isModalOpen = this.omnisearchDialog.open;
    // Only handle the event if the user is pressing the correct modifier key
    // and the modal is not open and the key pressed is a valid navigation key.
    if (
      !isModalOpen &&
      shouldHandle &&
      Object.keys(this.navActionMap).includes(e.key)
    ) {
      this.hideHotkeys();
      e.preventDefault();
      this.triggerAction(this.navActionMap[e.key]);
    } else if (
      shouldHandle &&
      !isModalOpen &&
      e.key === (this.isMac ? 'Meta' : 'Control')
    ) {
      // If the key pressed is a modifier key and the modal is not open, show
      // the hotkeys, unless another key is pressed.
      this.showHotkeys();
    } else {
      // Hide the hotkeys in all other cases.
      this.hideHotkeys();
    }
  },
  handleKeyUp(e) {
    // Hide the hotkeys when the user releases the modifier key.
    if (this.isMac ? e.key === 'Meta' : e.key === 'Control') {
      this.hideHotkeys();
    }
  },
  handleMouseMove(e) {
    const shouldHide = this.isMac ? !e.metaKey : !e.ctrlKey;
    // Hide the hotkeys if the modifier key is not pressed on mouse move.
    // Handles when switching tabs and the modifier was pressed before.
    if (shouldHide) this.hideHotkeys();
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
document.addEventListener('mousemove', hotkeys.handleMouseMove.bind(hotkeys));
