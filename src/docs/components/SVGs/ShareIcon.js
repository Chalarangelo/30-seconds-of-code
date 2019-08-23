import React from 'react';

const ShareIcon = ({ className, onClick }) => (
  <svg
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`feather feather-share-2 ${className}`}
  >
    <circle cx='18' cy='5' r='3'></circle>
    <circle cx='6' cy='12' r='3'></circle>
    <circle cx='18' cy='19' r='3'></circle>
    <line x1='8.59' y1='13.51' x2='15.42' y2='17.49'></line>
    <line x1='15.41' y1='6.51' x2='8.59' y2='10.49'></line>
  </svg>
);

export default ShareIcon;
