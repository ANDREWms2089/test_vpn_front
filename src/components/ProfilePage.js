import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import icPay from '../images/icons/ic_pay.png';
import icReferal from '../images/icons/ic_referal.png';
import icSupport from '../images/icons/ic_support.png';
import icTrans from '../images/icons/ic_trans.png';
import icDoc from '../images/icons/ic_doc.png';
import icTut from '../images/icons/ic_tut.png';
import icCopy from '../images/icons/ic_copy.png';
import TransactionsModal from './TransactionsModal';
import ReferralModal from './ReferralModal';
import AgreementModal from './AgreementModal';
import apiService from '../services/api';

function ProfilePage({ user, onBack, onNavigateToPayment }) {
  const uid = user?.userid ?? user?.id;
  const [subscriptionLink, setSubscriptionLink] = useState(user?.user_key ?? '');
  const [referralLink, setReferralLink] = useState('');
  const [friendsInvited, setFriendsInvited] = useState(0);
  const [isReferralLoading, setIsReferralLoading] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  useEffect(() => {
    if (user?.user_key) setSubscriptionLink(user.user_key);
  }, [user?.user_key]);

  useEffect(() => {
    if (!isReferralOpen || uid == null || uid === '') return;
    let cancelled = false;
    setReferralLink('');
    setIsReferralLoading(true);
    (async () => {
      try {
        const [linkRes, countRes] = await Promise.all([
          apiService.getReferralLink(String(uid)),
          apiService.getReferralCount(String(uid)),
        ]);
        if (cancelled) return;
        if (linkRes && typeof linkRes.referral_link === 'string') {
          setReferralLink(linkRes.referral_link);
        }
        if (typeof countRes?.referral_count === 'number') {
          setFriendsInvited(countRes.referral_count);
        }
      } catch (_) {}
      if (!cancelled) setIsReferralLoading(false);
    })();
    return () => { cancelled = true; setIsReferralLoading(false); };
  }, [isReferralOpen, uid]);

  const userName = user 
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Пользователь'
    : 'Пользователь';
  
  const userId = uid ?? '';

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(userId));
  };

  const handleCopyLink = () => {
    if (subscriptionLink) navigator.clipboard.writeText(subscriptionLink);
  };

  return (
    <div className="profile-page">
      <div className="background"></div>
      <div className="profile-content">
        <div className="profile-header">
          <button type="button" className="back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="profile-title">Профиль</h1>
          <div className="profile-header-spacer"></div>
        </div>

        <div className="profile-body">
          <div className="profile-info-section">
            <h2 className="profile-name">{userName}</h2>
            <div className="profile-id-container">
              <span className="profile-id">id: {userId}</span>
              <button type="button" className="copy-button" onClick={handleCopyId}>
                <img src={icCopy} alt="Copy" className="copy-icon" />
              </button>
            </div>
          </div>

          <button type="button" className="profile-menu-item" onClick={() => onNavigateToPayment?.()}>
            <img src={icPay} alt="" className="menu-icon" />
            <span className="menu-text">Оплата</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => setIsTransactionsOpen(true)}>
            <img src={icTrans} alt="" className="menu-icon" />
            <span className="menu-text">Мои транзакции</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => setIsReferralOpen(true)}>
            <img src={icReferal} alt="" className="menu-icon" />
            <span className="menu-text">Реферальная программа</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => {}}>
            <img src={icSupport} alt="" className="menu-icon" />
            <span className="menu-text">Связаться с поддержкой</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => setIsAgreementOpen(true)}>
            <img src={icDoc} alt="" className="menu-icon" />
            <span className="menu-text">Пользовательское соглашение</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="subscription-link-section">
            <label className="subscription-link-label">Ссылка на подписку для ручного ввода:</label>
            <div className="subscription-link-input-container">
              <input 
                type="text" 
                className="subscription-link-input" 
                value={subscriptionLink || '—'} 
                readOnly
              />
              <button type="button" className="copy-button" onClick={handleCopyLink}>
                <img src={icCopy} alt="Copy" className="copy-icon" />
              </button>
            </div>
          </div>

          <button type="button" className="instruction-button" onClick={() => {}}>
            <img src={icTut} alt="" className="instruction-icon" />
            <span className="instruction-text">Инструкция для всех платформ</span>
          </button>
        </div>
      </div>
      <TransactionsModal 
        isOpen={isTransactionsOpen} 
        onClose={() => setIsTransactionsOpen(false)} 
        userId={uid}
      />
      <ReferralModal 
        isOpen={isReferralOpen} 
        onClose={() => setIsReferralOpen(false)} 
        referralLink={referralLink}
        friendsInvited={friendsInvited}
        isLoading={isReferralLoading}
      />
      <AgreementModal 
        isOpen={isAgreementOpen} 
        onClose={() => setIsAgreementOpen(false)} 
      />
    </div>
  );
}

export default ProfilePage;

