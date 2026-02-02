import React, { useState, useEffect } from 'react';
import './ConfirmationModal.css';
import apiService from '../services/api';
import { triggerHaptic } from '../services/telegram';
import { PAYMENT_METHODS, getPaymentMethod, setPaymentMethod } from '../utils/paymentMethod';

function ConfirmationModal({ isOpen, onClose, plan, tariffId, formatDateEnd, userId }) {
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState(null);
  const [paymentMethod, setPaymentMethodState] = useState('card');

  useEffect(() => {
    if (isOpen) setPaymentMethodState(getPaymentMethod());
  }, [isOpen]);

  if (!isOpen) return null;

  const dateEnd = plan && formatDateEnd ? formatDateEnd(plan.months) : '';
  const monthWord = plan && plan.months === 1 ? 'месяц' : (plan && plan.months >= 2 && plan.months <= 4 ? 'месяца' : 'месяцев');
  const subscriptionText = plan
    ? `Подписка до ${dateEnd}, ${plan.months} ${monthWord}`
    : '';

  const deviceCount = 2;
  const displayPrice = plan ? plan.price : 0;

  const durationDays = plan ? Math.round(plan.months * 30.44) : 30;
  const tariffPlan = tariffId === 'pro' ? 'pro' : 'basic';
  const returnUrl = typeof window !== 'undefined' ? window.location.origin + '/' : '';

  const handlePay = async () => {
    triggerHaptic();
    if (!userId || !plan || isPaying) return;
    setPaymentMethod(paymentMethod);
    setIsPaying(true);
    setPayError(null);
    try {
      const res = await apiService.subscriptionCheckout({
        userid: userId,
        tariff_plan: tariffPlan,
        duration_days: durationDays,
        amount: String(plan.price),
        return_url: returnUrl,
        payment_method: paymentMethod,
      });
      if (res && res.confirmation_url) {
        window.location.href = res.confirmation_url;
        return;
      }
      setPayError('Не удалось получить ссылку на оплату');
    } catch (e) {
      setPayError(e.message || 'Ошибка при создании платежа');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="confirmation-overlay" onClick={() => { triggerHaptic(); onClose?.(); }}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-header">
          <h2 className="confirmation-title">Подтверждение</h2>
          <button type="button" className="confirmation-close" onClick={() => { triggerHaptic(); onClose?.(); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="confirmation-body">
          <div className="confirmation-row">
            <span className="confirmation-label">Подписка</span>
            <span className="confirmation-value">{subscriptionText}</span>
          </div>
          <div className="confirmation-row">
            <span className="confirmation-label">Количество устройств</span>
            <span className="confirmation-value">{deviceCount}</span>
          </div>
          <div className="confirmation-row">
            <span className="confirmation-label">Способ оплаты</span>
            <div className="confirmation-payment-methods">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`confirmation-payment-method-btn ${paymentMethod === method.id ? 'confirmation-payment-method-btn-selected' : ''}`}
                  onClick={() => { triggerHaptic(); setPaymentMethodState(method.id); }}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {payError && (
            <p className="confirmation-error">{payError}</p>
          )}
          <button
            type="button"
            className="confirmation-pay-button"
            onClick={handlePay}
            disabled={isPaying || !userId}
          >
            {isPaying ? 'Загрузка…' : `Оплатить ${displayPrice} Р`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
