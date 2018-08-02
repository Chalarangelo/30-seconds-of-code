const triggerEvent = (el, eventType, detail = undefined) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail: detail }));
module.exports = triggerEvent;
