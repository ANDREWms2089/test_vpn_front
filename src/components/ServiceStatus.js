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

  const getSubscriptionColorClass = () => {
    const tariffEndDate = user?.tariff_end_date;
    if (!tariffEndDate) return 'subscription-color-red';
    const endDate = new Date(tariffEndDate);
    const now = new Date();
    if (endDate <= now) return 'subscription-color-red';
    const diffMs = endDate - now;
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (daysLeft > 3) return 'subscription-color-green';
    return 'subscription-color-yellow';
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

  const colorClass = getSubscriptionColorClass();

  return (
    <div className="service-status">
      <div className="service-name">Beznet</div>
      <div className={`subscription-date ${colorClass}`}>{subscriptionDate}</div>
      <div className="service-state">{isOnline ? 'online' : 'offline'}</div>
      <div className={`subscription-type ${colorClass}`}>{subscriptionType}</div>
    </div>
  );
}

export default ServiceStatus;

