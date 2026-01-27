import React from 'react';
import './AgreementModal.css';

function AgreementModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="agreement-overlay" onClick={onClose}>
      <div className="agreement-modal" onClick={(e) => e.stopPropagation()}>
        <div className="agreement-header">
          <h2 className="agreement-title">Пользовательское соглашение</h2>
          <button type="button" className="agreement-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="agreement-body">
          <section className="agreement-section">
            <h3 className="agreement-heading">Условия использования</h3>
            <p className="agreement-text">
              Используя BezNet, вы автоматически соглашаетесь с этими условиями использования и обязуетесь не нарушать законодательство Российской Федерации или других государств.
            </p>
          </section>

          <section className="agreement-section">
            <h3 className="agreement-heading">Сервис</h3>
            <p className="agreement-text">
              VPN-сервис обеспечивает конфиденциальность личной информации путем шифрования и анонимизации метаданных пользователя, скрывая его IP-адрес. Эти адреса используют множество других пользователей, что не только обеспечивает конфиденциальность для каждого из них, но и затрудняет определение характера их деятельности. Мы не изменяем, не перенаправляем и не внедряемся в пользовательский трафик.
            </p>
          </section>

          <section className="agreement-section">
            <h3 className="agreement-heading">Сервис</h3>
            <p className="agreement-text">
              Всем пользователям доступен демо период в течение трех дней с момента авторизации в приложении.
            </p>
          </section>

          <section className="agreement-section">
            <h3 className="agreement-heading">Автоматическое продление</h3>
            <p className="agreement-text">
              Оплачивая подписку, вы соглашаетесь на автоматическое продление. Уведомление о том, что подписка закончится, будет отправлено заранее. Отменить автоматическое продление можно в настройках подписки до даты списания средств.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AgreementModal;
