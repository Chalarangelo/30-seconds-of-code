export const language = {
  name: 'Language',
  fields: [
    { name: 'long', type: 'stringRequired' },
    { name: 'short', type: 'stringRequired' },
    { name: 'name', type: 'stringRequired' },
    { name: 'icon', type: 'string' },
    { name: 'tagIcons', type: 'stringObjectRequired', defaultValue: {} },
  ],
  scopes: {
    // Hacky way to exclude the HTML language from the list
    full: language => language.icon,
  },
};
