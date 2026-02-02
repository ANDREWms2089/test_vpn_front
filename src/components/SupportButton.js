import React from 'react';
import './SupportButton.css';
import messIcon from '../images/icons/icon_mess.png';
import { triggerHaptic, getMiniApp } from '../services/telegram';

const SUPPORT_LINK = 'https://t.me/maria_matrohina';

function SupportButton() {
  const handleClick = () => {
    triggerHaptic();
    const miniApp = getMiniApp?.();
    if (miniApp?.openLink) {
      miniApp.openLink(SUPPORT_LINK);
    } else if (typeof window !== 'undefined') {
      window.open(SUPPORT_LINK, '_blank');
    }
  };

  return (
    <button className="support-button" onClick={handleClick}>
      <img src={messIcon} alt="" className="button-icon" />
      <span className="button-text">Поддержка</span>
    </button>
  );
}

export default SupportButton;

