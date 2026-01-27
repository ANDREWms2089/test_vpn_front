import React from 'react';
import './Logo.css';
import logoImage from '../images/icons/Logo.png';

function Logo() {
  return (
    <div className="logo-container">
      <div className="ripple ripple-5"></div>
      <div className="ripple ripple-4"></div>
      <div className="ripple ripple-3"></div>
      <div className="ripple ripple-2"></div>
      <div className="ripple ripple-1"></div>
      <div className="logo">
        <img src={logoImage} alt="Beznet" className="logo-image" />
      </div>
    </div>
  );
}

export default Logo;

