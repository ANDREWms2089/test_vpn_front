import React, { useState } from 'react';
import './ReferralModal.css';
import icCopy from '../images/icons/ic_copy.png';
import { triggerHaptic } from '../services/telegram';

function ReferralModal({ isOpen, onClose, referralLink = '', friendsInvited = 0, isLoading = false }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    triggerHaptic();
    if (referralLink && !isLoading) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="referral-overlay" onClick={() => { triggerHaptic(); onClose?.(); }}>
      <div className="referral-modal" onClick={(e) => e.stopPropagation()}>
        <div className="referral-header">
          <h2 className="referral-title">Реферальная программа</h2>
          <button type="button" className="referral-close" onClick={() => { triggerHaptic(); onClose?.(); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="referral-body">
          <div className="referral-rewards-box">
            <p className="referral-rewards-text">
              За каждого приглашённого друга, который купил подписку Pro, вы получаете 100Р вознаграждения, а за подписку Basic — 30Р. Ваш друг при оплате подписки получает 7 дней бесплатного доступа в подарок
            </p>
            <p className="referral-friends-count">Друзей приглашено: {friendsInvited}</p>
          </div>

          <div className="referral-link-section">
            <label className="referral-link-label">Ваша реферальная ссылка:</label>
            <div className="referral-link-container">
              <input 
                type="text" 
                className="referral-link-input" 
                value={isLoading ? 'Загрузка…' : (referralLink || '—')} 
                readOnly 
              />
              <button type="button" className="referral-copy-button" onClick={handleCopyLink} disabled={isLoading || !referralLink}>
                <img src={icCopy} alt="" className="referral-copy-icon" />
                {copied && <span className="referral-copied-tip">Скопировано</span>}
              </button>
            </div>
          </div>

          <div className="referral-history-section">
            <label className="referral-history-label">История начислений:</label>
            <div className="referral-history-empty">
              <svg 
                className="referral-history-icon" 
                width="48" 
                height="48" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="8" y="6" width="32" height="36" rx="3" stroke="white" strokeWidth="2"/>
                <path d="M8 16H40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 24H34" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14 30H34" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="referral-history-text">Ещё нет записей</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralModal;
