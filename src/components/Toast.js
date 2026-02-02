import React, { useEffect } from 'react';
import './Toast.css';
import { triggerHaptic } from '../services/telegram';

function Toast({ message, type = 'info', isOpen, onClose, duration = 3000 }) {
  const handleClose = () => {
    triggerHaptic();
    onClose?.();
  };
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-message">{message}</span>
      <button type="button" className="toast-close" onClick={handleClose}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default Toast;
