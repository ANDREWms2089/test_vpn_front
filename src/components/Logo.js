import React from 'react';
import './Logo.css';
import logoImage from '../images/icons/good_icons/icon.png';

function Logo() {
  return (
    <div className="logo-container">
      <div className="ripple ripple-1"></div>
      <div className="ripple ripple-2"></div>
      <div className="ripple ripple-3"></div>
      <div className="ripple ripple-4"></div>
      <div className="logo-ring"></div>
      <div className="logo">
        <img src={logoImage} alt="BezNet VPN" className="logo-image" />
      </div>
    </div>
  );
}

export default Logo;

