const observeMutations = (element, callback, options) => {
const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
observer.observe(
element,
Object.assign(
{
childList: true,
attributes: true,
attributeOldValue: true,
characterData: true,
characterDataOldValue: true,
subtree: true
},
options
)
);
return observer;
};
module.exports = observeMutations;