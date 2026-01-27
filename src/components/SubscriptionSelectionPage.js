import React, { useState } from 'react';
import './SubscriptionSelectionPage.css';
import ConfirmationModal from './ConfirmationModal';

const PLANS = [
  { id: '1m', months: 1, label: '1 месяца', price: 149, pricePerMonth: null },
  { id: '3m', months: 3, label: '3 месяца', price: 399, pricePerMonth: 110 },
  { id: '6m', months: 6, label: '6 месяцев', price: 749, pricePerMonth: 120 },
  { id: '12m', months: 12, label: '1 год', price: 1399, pricePerMonth: 110 },
];

function SubscriptionSelectionPage({ onBack, tariffId, userId }) {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handlePayClick = () => {
    setIsConfirmOpen(true);
  };

  const formatDateEnd = (months) => {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    const day = d.getDate();
    const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${day} ${monthsRu[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="subscription-selection-page">
      <div className="subscription-selection-background"></div>
      <div className="subscription-selection-content">
        <div className="subscription-selection-header">
          <button type="button" className="subscription-selection-back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="subscription-selection-title">Выбор подписки</h1>
          <div className="subscription-selection-header-spacer"></div>
        </div>

        <div className="subscription-selection-body">
          <div className="subscription-selection-grid">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className={`subscription-plan-card ${selectedPlan.id === plan.id ? 'subscription-plan-card-selected' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <span className="subscription-plan-badge">ПОПУЛЯРНЫЙ</span>
                <span className="subscription-plan-label">{plan.label}</span>
                <span className="subscription-plan-price">{plan.price} Р</span>
                {plan.pricePerMonth != null && (
                  <span className="subscription-plan-price-per-month">{plan.pricePerMonth} Р в месяц</span>
                )}
              </button>
            ))}
          </div>

          <button type="button" className="subscription-selection-pay-button" onClick={handlePayClick}>
            Оплатить {selectedPlan.price} Р
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        plan={selectedPlan}
        tariffId={tariffId}
        formatDateEnd={formatDateEnd}
        userId={userId}
      />
    </div>
  );
}

export default SubscriptionSelectionPage;
