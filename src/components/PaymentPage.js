import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import AppHeader from './AppHeader';
import { triggerHaptic } from '../services/telegram';
import { PAYMENT_METHODS, getPaymentMethod, setPaymentMethod } from '../utils/paymentMethod';

function PaymentPage({ onBack }) {
  const [selectedMethod, setSelectedMethod] = useState('card');

  useEffect(() => {
    setSelectedMethod(getPaymentMethod());
  }, []);

  const handleSelectMethod = (id) => {
    triggerHaptic();
    setPaymentMethod(id);
    setSelectedMethod(id);
  };

  const handleDisableAutoRenewal = () => {
    triggerHaptic();
  };

  return (
    <div className="payment-page">
      <div className="payment-background"></div>
      <AppHeader title="BezNet VPN" />
      <div className="payment-content">
        <div className="payment-body">
          <div className="payment-methods-section">
            <span className="payment-methods-section-title">Способ оплаты</span>
            <p className="payment-methods-section-desc">Выбранный способ будет использоваться при оплате и продлении подписки</p>
            <div className="payment-methods-list">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-method-item ${selectedMethod === method.id ? 'payment-method-item-selected' : ''}`}
                  onClick={() => handleSelectMethod(method.id)}
                >
                  <span className="payment-method-item-label">{method.label}</span>
                  {selectedMethod === method.id && (
                    <svg className="payment-method-item-check" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 5L7 14L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
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
