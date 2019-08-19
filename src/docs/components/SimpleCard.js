import React from 'react';

// ===================================================
// Generic card (displays textual content)
// ===================================================
const SimpleCard = ({ 
  title, 
  children
}) => (
  <div className='card short'>
    <h4 className='card-title'>
      {title}
    </h4>
    <div className='card-description'>
      {children}
    </div>
  </div>
);

export default SimpleCard;
