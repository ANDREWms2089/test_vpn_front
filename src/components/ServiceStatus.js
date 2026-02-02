import React from 'react';
import './ServiceStatus.css';

function ServiceStatus({ user }) {
  const isOnline = false;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusState = () => {
    const tariffEndDate = user?.tariff_end_date;
    if (!tariffEndDate) return { label: 'Не активный', class: 'subscription-color-inactive' };
    const endDate = new Date(tariffEndDate);
    const now = new Date();
    if (endDate <= now) return { label: 'Не активный', class: 'subscription-color-inactive' };
    const diffMs = endDate - now;
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7) return { label: 'Пробный период', class: 'subscription-color-trial' };
    return { label: 'Активный', class: 'subscription-color-active' };
  };

  const tariffEndDate = user?.tariff_end_date;
  const hasActiveSubscription = tariffEndDate && new Date(tariffEndDate) > new Date();
  const subscriptionDate = tariffEndDate && hasActiveSubscription
    ? `до ${formatDate(tariffEndDate)}`
    : 'нет подписки';

  const statusState = getStatusState();

  return (
    <div className="service-status">
      <div className="service-name">Beznet</div>
      <div className="subscription-date">{subscriptionDate}</div>
      <div className="service-state">{isOnline ? 'online' : 'offline'}</div>
      <div className={`subscription-type ${statusState.class}`}>{statusState.label}</div>
    </div>
  );
}

export default ServiceStatus;

