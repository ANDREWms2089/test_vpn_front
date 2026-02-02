import React from 'react';
import './SetupButton.css';
import settingsIcon from '../images/icons/icon_settings.png';
import { detectPlatform, getPlatformText } from '../utils/platform';
import { triggerHaptic } from '../services/telegram';

function SetupButton({ onOpenSetup }) {
  const platform = detectPlatform();
  const platformText = getPlatformText(platform);

  const handleClick = () => {
    triggerHaptic();
    if (onOpenSetup) {
      onOpenSetup();
    }
  };

  return (
    <button className="setup-button" onClick={handleClick}>
      <img src={settingsIcon} alt="" className="button-icon" />
      <span className="button-text">Установка и настройка</span>
      <span className="button-platform">{platformText}</span>
    </button>
  );
}

export default SetupButton;

