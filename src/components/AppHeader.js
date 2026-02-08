import React from 'react';
import './AppHeader.css';
import botIcon from '../images/icons/good_icons/icon.png';

function AppHeader({ title }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <img src={botIcon} alt="" className="app-header-icon" />
        <span className="app-header-title">{title || 'BezNet VPN'}</span>
      </div>
    </header>
  );
}

export default AppHeader;
