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

  const tariffEndDate = user?.tariff_end_date;
  const subscriptionDate = tariffEndDate
    ? `до ${formatDate(tariffEndDate)}`
    : 'до 31 декабря 2025';

  const subscriptionType = user?.tariff_plan
    ? (user.tariff_plan.toLowerCase().includes('trial') || user.tariff_plan.toLowerCase().includes('basic') ? 'пробный период' : 'активна')
    : 'пробный период';

  return (
    <div className="service-status">
      <div className="service-name">Beznet</div>
      <div className="subscription-date">{subscriptionDate}</div>
      <div className="service-state">{isOnline ? 'online' : 'offline'}</div>
      <div className="subscription-type">{subscriptionType}</div>
    </div>
  );
}

export default ServiceStatus;

