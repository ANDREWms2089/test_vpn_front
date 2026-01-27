import React, { useState } from 'react';
import './SetupFlow.css';
import { detectPlatform } from '../utils/platform';
import icConnect from '../images/icons/ic_connect.png';
import icCloud from '../images/icons/ic_cloud.png';
import icAdd from '../images/icons/ic_add.png';
import icDone from '../images/icons/ic_done.png';

const PLATFORM_LINKS = {
  'Windows': 'https://www.happ.su/main/ru',
  'Android': 'https://play.google.com/store/apps/details?id=com.v2raytun.android&pli=1',
  'iOS': 'https://apps.apple.com/us/app/v2raytun/id6476628951',
  'macOS': 'https://apps.apple.com/ru/app/v2raytun/id6476628951',
  'Linux': 'https://www.happ.su/main/ru',
  'Unknown': 'https://www.happ.su/main/ru'
};

function SetupFlow({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const platform = detectPlatform();
  const installLink = PLATFORM_LINKS[platform] || PLATFORM_LINKS['Unknown'];
  const subscriptionLink = 'https://ultm.app/XMEEucdk';

  const handleInstallClick = () => {
    window.open(installLink, '_blank');
  };

  const handleAddSubscription = () => {
    window.open(subscriptionLink, '_blank');
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
            <button className="setup-primary-button" onClick={() => setStep(2)}>
              Начать установку на этом устройстве
            </button>
            <button className="setup-secondary-button" onClick={() => setStep(2)}>
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
            <button className="setup-next-button" onClick={() => setStep(3)}>
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
            <button className="setup-next-button" onClick={() => setStep(4)}>
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
            <button className="setup-complete-button" onClick={onComplete}>
              Завершить настройку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default SetupFlow;

