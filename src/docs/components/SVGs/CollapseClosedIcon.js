import React from 'react';

const CollapseClosedIcon = ({ className, onClick }) => (
  <svg
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`feather feather-plus-square ${className}`}
  >
    <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
    <line x1='12' y1='8' x2='12' y2='16'></line>
    <line x1='8' y1='12' x2='16' y2='12'></line>
  </svg>
);

export default CollapseClosedIcon;
