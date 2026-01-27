import React from 'react';
import './SubscriptionButton.css';
import connectIcon from '../images/icons/icon_connect.png';

function SubscriptionButton({ onOpenSubscribe }) {
  const handleClick = () => {
    onOpenSubscribe?.();
  };

  return (
    <button className="subscription-button" onClick={handleClick}>
      <img src={connectIcon} alt="" className="button-icon" />
      <span className="button-text">Купить подписку</span>
      <span className="button-price">от 149 Р</span>
    </button>
  );
}

export default SubscriptionButton;

