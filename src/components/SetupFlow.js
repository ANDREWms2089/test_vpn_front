import React, { useState } from 'react';
import './SetupFlow.css';
import { detectPlatform } from '../utils/platform';
import icConnect from '../images/icons/ic_connect.png';
import icCloud from '../images/icons/ic_cloud.png';
import icAdd from '../images/icons/ic_add.png';
import icDone from '../images/icons/ic_done.png';
import apiService from '../services/api';
import Toast from './Toast';
import { triggerHaptic } from '../services/telegram';

const PLATFORM_LINKS = {
  'Windows': 'https://www.happ.su/main/ru',
  'Android': 'https://play.google.com/store/apps/details?id=com.v2raytun.android&pli=1',
  'iOS': 'https://apps.apple.com/us/app/v2raytun/id6476628951',
  'macOS': 'https://apps.apple.com/ru/app/v2raytun/id6476628951',
  'Linux': 'https://www.happ.su/main/ru',
  'Unknown': 'https://www.happ.su/main/ru'
};

function SetupFlow({ onBack, onComplete, user }) {
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'info' });
  const platform = detectPlatform();
  const installLink = PLATFORM_LINKS[platform] || PLATFORM_LINKS['Unknown'];
  const subscriptionLink = user?.user_key || 'https://ultm.app/XMEEucdk';

  const handleInstallClick = () => {
    triggerHaptic();
    window.open(installLink, '_blank');
  };

  const calculateDaysUntilExpiry = () => {
    if (!user?.tariff_end_date) return 0;
    const endDate = new Date(user.tariff_end_date);
    const now = new Date();
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleAddSubscription = async () => {
    triggerHaptic();
    const hasSubscription = user?.tariff_plan && user?.tariff_end_date && new Date(user.tariff_end_date) > new Date();
    const hasKey = user?.user_key;

    if (!hasSubscription) {
      setToast({ isOpen: true, message: 'Сначала оформите подписку. Перейдите в раздел «Купить подписку» на главном экране.', type: 'error' });
      return;
    }

    if (hasKey) {
      const linkToOpen = subscriptionLink.startsWith('v2raytun://import/') 
        ? subscriptionLink 
        : `v2raytun://import/${subscriptionLink}`;
      window.open(linkToOpen, '_blank');
      return;
    }

    try {
      const daysUntilExpiry = calculateDaysUntilExpiry();
      if (daysUntilExpiry <= 0) {
        setToast({ isOpen: true, message: 'Подписка истекла', type: 'error' });
        return;
      }

      const userId = user?.userid ?? user?.id;
      if (!userId) {
        setToast({ isOpen: true, message: 'Ошибка: пользователь не найден', type: 'error' });
        return;
      }

      const keyResponse = await apiService.generateKey(daysUntilExpiry);
      let generatedKey = null;
      if (typeof keyResponse === 'string') {
        generatedKey = keyResponse;
      } else if (keyResponse && typeof keyResponse === 'object') {
        generatedKey = keyResponse.key || keyResponse.user_key || keyResponse.subscription_link || keyResponse.url || keyResponse.link;
      }

      if (!generatedKey || generatedKey.trim() === '') {
        setToast({ isOpen: true, message: 'Не удалось получить ключ из ответа API', type: 'error' });
        return;
      }

      const keyWithPrefix = generatedKey.startsWith('v2raytun://import/') 
        ? generatedKey 
        : `v2raytun://import/${generatedKey}`;

      await apiService.updateKey(userId, keyWithPrefix);
      setToast({ isOpen: true, message: 'Ключ успешно сгенерирован и сохранён', type: 'success' });
      setTimeout(() => {
        window.open(keyWithPrefix, '_blank');
      }, 500);
    } catch (error) {
      setToast({ isOpen: true, message: error.message || 'Ошибка при генерации ключа', type: 'error' });
    }
  };

  if (step === 1) {
    return (
      <div className="setup-flow">
        <div className="background"></div>
        <div className="setup-content">
          <div className="setup-icon-container">
            <div className="setup-ripple"></div>
            <div className="setup-icon-wrapper">
              <img src={icConnect} alt="" className="setup-icon-image" />
            </div>
          </div>
          <h2 className="setup-title">Настройка на {platform === 'iOS' ? 'iOS' : platform}</h2>
          <p className="setup-description">Настройка VPN происходит в 3 шага и занимает пару минут</p>
          <div className="setup-buttons">
            <button className="setup-primary-button" onClick={() => { triggerHaptic(); setStep(2); }}>
              Начать установку на этом устройстве
            </button>
            <button className="setup-secondary-button" onClick={() => { triggerHaptic(); setStep(2); }}>
              Установить на другом устройстве
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="setup-flow">
        <div className="background"></div>
        <div className="setup-content">
          <div className="setup-icon-container">
            <div className="setup-ripple"></div>
            <div className="setup-icon-wrapper">
              <img src={icCloud} alt="" className="setup-icon-image" />
            </div>
          </div>
          <h2 className="setup-title">Приложение</h2>
          <p className="setup-description">Установите приложение v2RayTun и вернитесь к этому экрану</p>
          <div className="setup-buttons-row">
            <button className="setup-install-button" onClick={handleInstallClick}>
              <img src={icConnect} alt="" className="button-icon-small" />
              Установить
            </button>
            <button className="setup-next-button" onClick={() => { triggerHaptic(); setStep(3); }}>
              Далее
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="setup-flow">
        <div className="background"></div>
        <div className="setup-content">
          <div className="setup-icon-container">
            <div className="setup-ripple"></div>
            <div className="setup-icon-wrapper">
              <img src={icAdd} alt="" className="setup-icon-image" />
            </div>
          </div>
          <h2 className="setup-title">Подписка</h2>
          <p className="setup-description">Добавьте подписку в приложение v2RayTun с помощью кнопки ниже</p>
          <div className="setup-buttons-row">
            <button className="setup-add-button" onClick={handleAddSubscription}>
              <img src={icConnect} alt="" className="button-icon-small" />
              Добавить
            </button>
            <button className="setup-next-button" onClick={() => { triggerHaptic(); setStep(4); }}>
              Далее
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="setup-flow">
        <div className="background"></div>
        <div className="setup-content">
          <div className="setup-icon-container">
            <div className="setup-success-ripple"></div>
            <div className="setup-success-icon">
              <img src={icDone} alt="" className="setup-done-image" />
            </div>
          </div>
          <h2 className="setup-title">Готово!</h2>
          <p className="setup-description">Нажмите на круглую кнопку включения VPN в приложении v2RayTun</p>
          <div className="setup-buttons">
            <button className="setup-complete-button" onClick={() => { triggerHaptic(); onComplete?.(); }}>
              Завершить настройку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {step === 1 && (
        <div className="setup-flow">
          <div className="background"></div>
          <div className="setup-content">
            <div className="setup-icon-container">
              <div className="setup-ripple"></div>
              <div className="setup-icon-wrapper">
                <img src={icConnect} alt="" className="setup-icon-image" />
              </div>
            </div>
            <h2 className="setup-title">Настройка на {platform === 'iOS' ? 'iOS' : platform}</h2>
            <p className="setup-description">Настройка VPN происходит в 3 шага и занимает пару минут</p>
            <div className="setup-buttons">
              <button className="setup-primary-button" onClick={() => { triggerHaptic(); setStep(2); }}>
                Начать установку на этом устройстве
              </button>
              <button className="setup-secondary-button" onClick={() => { triggerHaptic(); setStep(2); }}>
                Установить на другом устройстве
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="setup-flow">
          <div className="background"></div>
          <div className="setup-content">
            <div className="setup-icon-container">
              <div className="setup-ripple"></div>
              <div className="setup-icon-wrapper">
                <img src={icCloud} alt="" className="setup-icon-image" />
              </div>
            </div>
            <h2 className="setup-title">Приложение</h2>
            <p className="setup-description">Установите приложение v2RayTun и вернитесь к этому экрану</p>
            <div className="setup-buttons-row">
              <button className="setup-install-button" onClick={handleInstallClick}>
                <img src={icConnect} alt="" className="button-icon-small" />
                Установить
              </button>
              <button className="setup-next-button" onClick={() => { triggerHaptic(); setStep(3); }}>
                Далее
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="setup-flow">
          <div className="background"></div>
          <div className="setup-content">
            <div className="setup-icon-container">
              <div className="setup-ripple"></div>
              <div className="setup-icon-wrapper">
                <img src={icAdd} alt="" className="setup-icon-image" />
              </div>
            </div>
            <h2 className="setup-title">Подписка</h2>
            <p className="setup-description">Добавьте подписку в приложение v2RayTun с помощью кнопки ниже</p>
            <div className="setup-buttons-row">
              <button className="setup-add-button" onClick={handleAddSubscription}>
                <img src={icConnect} alt="" className="button-icon-small" />
                Добавить
              </button>
              <button className="setup-next-button" onClick={() => { triggerHaptic(); setStep(4); }}>
                Далее
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="setup-flow">
          <div className="background"></div>
          <div className="setup-content">
            <div className="setup-icon-container">
              <div className="setup-success-ripple"></div>
              <div className="setup-success-icon">
                <img src={icDone} alt="" className="setup-done-image" />
              </div>
            </div>
            <h2 className="setup-title">Готово!</h2>
            <p className="setup-description">Нажмите на круглую кнопку включения VPN в приложении v2RayTun</p>
            <div className="setup-buttons">
              <button className="setup-complete-button" onClick={() => { triggerHaptic(); onComplete?.(); }}>
                Завершить настройку
              </button>
            </div>
          </div>
        </div>
      )}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </>
  );
}

export default SetupFlow;

