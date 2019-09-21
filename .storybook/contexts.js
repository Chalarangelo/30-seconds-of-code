import React from 'react';

const PageWrapper = ({
  theme,
  children
}) => {
  // TODO: Move these styles to an organism(?) later down the line, just use the class here
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width: '100vw',
    height: '100vh',
    flexDirection: 'column'
  }
  return (
    <div className={`page-container${theme==='dark' ? ' theme' : ''}`} style={style}>
      {children}
    </div>
  )
};

export default [
  {
    icon: 'mirror',
    title: 'Modes',
    components: [
      PageWrapper
    ],
    params: [
      {
        name: 'Light mode', 
        props:  {
          theme: 'light'
        },
        default: true
      },
      {
        name: 'Dark mode',
        props: {
          theme: 'dark'
        }
      }
    ]
  }
];