import React from 'react';
import './SubscriptionButton.css';
import connectIcon from '../images/icons/icon_connect.png';
import { triggerHaptic } from '../services/telegram';

function SubscriptionButton({ user, onOpenSubscribe }) {
  const hasActiveSubscription = user?.tariff_end_date && new Date(user.tariff_end_date) > new Date();
  const buttonLabel = hasActiveSubscription ? 'Продлить подписку' : 'Купить подписку';

  const handleClick = () => {
    triggerHaptic();
    onOpenSubscribe?.();
  };

  return (
    <button className="subscription-button" onClick={handleClick}>
      <img src={connectIcon} alt="" className="button-icon" />
      <span className="button-text">{buttonLabel}</span>
      <span className="button-price">от 399 Р</span>
    </button>
  );
}

export default SubscriptionButton;

