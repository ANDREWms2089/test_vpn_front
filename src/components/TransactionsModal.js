import React, { useState, useEffect } from 'react';
import './TransactionsModal.css';
import apiService from '../services/api';
import { triggerHaptic } from '../services/telegram';

function formatDate(str) {
  if (!str) return '—';
  try {
    const d = new Date(str);
    if (Number.isNaN(d.getTime())) return str;
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const h = d.getHours();
    const m = d.getMinutes();
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year} ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  } catch {
    return str;
  }
}

function statusLabel(s) {
  if (!s) return '—';
  const t = String(s).toLowerCase();
  if (t === 'succeeded') return 'Оплачено';
  if (t === 'pending') return 'В ожидании';
  if (t === 'canceled' || t === 'cancelled') return 'Отменено';
  if (t === 'failed') return 'Ошибка';
  return s;
}

function TransactionsModal({ isOpen, onClose, userId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || userId == null || userId === '') return;
    let cancelled = false;
    setLoading(true);
    setTransactions([]);
    (async () => {
      try {
        const res = await apiService.getTransactions(String(userId));
        if (cancelled) return;
        const list = Array.isArray(res?.transactions) ? res.transactions : [];
        setTransactions(list);
      } catch (_) {
        if (!cancelled) setTransactions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="transactions-overlay" onClick={() => { triggerHaptic(); onClose?.(); }}>
      <div
        className="transactions-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="transactions-header">
          <h2 className="transactions-title">Мои транзакции</h2>
          <button type="button" className="transactions-close" onClick={() => { triggerHaptic(); onClose?.(); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="transactions-body">
          {loading && (
            <div className="transactions-empty">
              <span className="transactions-empty-text">Загрузка…</span>
            </div>
          )}
          {!loading && transactions.length === 0 && (
            <div className="transactions-empty">
              <svg
                className="transactions-empty-icon"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="12" y="8" width="40" height="44" rx="4" stroke="white" strokeWidth="2"/>
                <path d="M12 24H52" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20 32H44" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 40H44" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="transactions-empty-text">Ещё нет транзакций</span>
            </div>
          )}
          {!loading && transactions.length > 0 && (
            <ul className="transactions-list">
              {transactions.map((t) => (
                <li key={t.payment_id ?? String(t.created_at) + t.amount} className="transactions-item">
                  <div className="transactions-item-row">
                    <span className="transactions-item-amount">{t.amount != null ? `${t.amount} Р` : '—'}</span>
                    <span className={`transactions-item-status transactions-item-status-${String(t.status || '').toLowerCase()}`}>
                      {statusLabel(t.status)}
                    </span>
                  </div>
                  <div className="transactions-item-meta">
                    {t.tariff_plan && <span>{t.tariff_plan}</span>}
                    {t.duration_days != null && <span>{t.duration_days} дн.</span>}
                    <span>{formatDate(t.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionsModal;
