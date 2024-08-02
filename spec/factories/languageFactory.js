const base = {
  id: 'lang',
  long: 'lang',
  short: 'lg',
  name: 'Language',
};

const traits = {
  js: {
    id: 'javascript',
    long: 'javascript',
    short: 'js',
    name: 'JavaScript',
  },
  css: {
    id: 'css',
    long: 'css',
    short: 'css',
    name: 'CSS',
  },
  html: {
    id: 'html',
    long: 'html',
    short: 'html',
    name: 'HTML',
  },
  react: {
    id: 'react',
    long: 'react',
    short: 'jsx',
    name: 'React',
  },
  python: {
    id: 'python',
    long: 'python',
    short: 'py',
    name: 'Python',
  },
  git: {
    id: 'git',
    long: 'git',
    short: 'shell',
    name: 'Git',
  },
};

export default { model: 'Language', base, traits };
