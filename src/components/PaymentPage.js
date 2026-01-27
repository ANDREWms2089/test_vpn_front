import React from 'react';
import './PaymentPage.css';

function PaymentPage({ onBack }) {
  const handleAddPayment = () => {};

  const handleDisableAutoRenewal = () => {};

  return (
    <div className="payment-page">
      <div className="payment-background"></div>
      <div className="payment-content">
        <div className="payment-header">
          <button type="button" className="payment-back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="payment-title">Оплата</h1>
          <div className="payment-header-spacer"></div>
        </div>

        <div className="payment-body">
          <div className="payment-methods-section">
            <button type="button" className="payment-methods-add" onClick={handleAddPayment}>
              <svg className="payment-add-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="28" height="28" rx="4" stroke="white" strokeWidth="2"/>
                <path d="M24 18V30M18 24H30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="payment-methods-text">У вас ещё нет добавленных способов оплаты</span>
            </button>
          </div>

          <button type="button" className="payment-auto-renewal-button" onClick={handleDisableAutoRenewal}>
            Отключить автопродление
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
