export default {
  name: '30 seconds of CSS',
  dirName: '30css',
  repoUrl: 'https://github.com/30-seconds/30-seconds-of-css',
  snippetPath: 'snippets',
  requirables: [
    'snippet_data/snippets.json',
  ],
  slug: 'css',
  reducer: 'cssReducer',
  resolver: 'cssResolver',
  featured: 3,
  theme: {
    backColor: '#3f4de4',
    foreColor: '#ffffff',
    iconName: 'css',
  },
  biasPenaltyMultiplier: 1.05,
};
