import React, { useState } from 'react';
import './SupportModal.css';
import messIcon from '../images/icons/icon_mess.png';

function SupportModal({ isOpen, onClose }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!isOpen) return null;

  const faqItems = [
    {
      question: 'Что делать, если VPN подключается, но сайты не открываются',
      answer: 'Попробуйте перезапустить VPN-соединение или выбрать другой сервер. Также проверьте настройки DNS на вашем устройстве.'
    },
    {
      question: 'VPN оплачен, но при этом не работает',
      answer: 'Убедитесь, что подписка активна. Если проблема сохраняется, обратитесь в поддержку для проверки статуса вашей подписки.'
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleContactSupport = () => {
    console.log('Contact support clicked');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Ответы на частые вопросы</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question" 
                onClick={() => toggleExpanded(index)}
              >
                <span className="faq-question-text">{item.question}</span>
                <svg 
                  className={`faq-chevron ${expandedIndex === index ? 'expanded' : ''}`}
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {expandedIndex === index && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="contact-support-button" onClick={handleContactSupport}>
            <img src={messIcon} alt="" className="contact-icon" />
            <span className="contact-text">Связаться с поддержкой</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportModal;

