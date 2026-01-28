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
  const hasActiveSubscription = tariffEndDate && new Date(tariffEndDate) > new Date();
  const subscriptionDate = tariffEndDate && hasActiveSubscription
    ? `до ${formatDate(tariffEndDate)}`
    : 'нет подписки';

  const tariffPlan = user?.tariff_plan;
  const subscriptionType = tariffPlan && hasActiveSubscription
    ? (tariffPlan.toLowerCase() === 'basic' ? 'Basic' : tariffPlan.toLowerCase() === 'pro' ? 'Pro' : tariffPlan)
    : 'нет подписки';

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

