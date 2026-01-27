import React from 'react';
import './SupportButton.css';
import messIcon from '../images/icons/icon_mess.png';

function SupportButton({ onOpenModal }) {
  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal();
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

