import React, { useState } from 'react';
import './TariffSelectionPage.css';

const TARIFFS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'от 149 Р/месяц',
    features: [
      'Станут доступны: Inst, YouTube, TikTok и др',
      'Необходим для базового пользования сетью',
      'Для Wi-Fi и домашнего интернета',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'от 399 Р/месяц',
    features: [
      'Работает даже при блокировках в городах LTE/5G',
      'Усиленная защита и обход',
      'Обход белого списка',
    ],
  },
];

function TariffSelectionPage({ onBack, onNext }) {
  const [selectedId, setSelectedId] = useState('basic');

  const handleNext = () => {
    onNext?.(selectedId);
  };

  return (
    <div className="tariff-page">
      <div className="tariff-background"></div>
      <div className="tariff-content">
        <div className="tariff-header">
          <button type="button" className="tariff-back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="tariff-title">Выбор тарифа</h1>
          <div className="tariff-header-spacer"></div>
        </div>

        <div className="tariff-body">
          <div className="tariff-cards">
            {TARIFFS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`tariff-card ${selectedId === t.id ? 'tariff-card-selected' : ''}`}
                onClick={() => setSelectedId(t.id)}
              >
                <div className="tariff-card-header">
                  <span className="tariff-card-name">{t.name}</span>
                  <span className="tariff-card-price-badge">{t.price}</span>
                </div>
                <ul className="tariff-card-features">
                  {t.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <button type="button" className="tariff-next-button" onClick={handleNext}>
            Далее
          </button>
        </div>
      </div>
    </div>
  );
}

export default TariffSelectionPage;
