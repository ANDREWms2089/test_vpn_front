import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import Logo from './components/Logo';
import ServiceStatus from './components/ServiceStatus';
import SubscriptionButton from './components/SubscriptionButton';
import SetupButton from './components/SetupButton';
import ProfileButton from './components/ProfileButton';
import SupportButton from './components/SupportButton';
import ProfilePage from './components/ProfilePage';
import PaymentPage from './components/PaymentPage';
import SetupFlow from './components/SetupFlow';
import TariffSelectionPage from './components/TariffSelectionPage';
import SubscriptionSelectionPage from './components/SubscriptionSelectionPage';
import { initTelegramSDK, getTelegramUser, showBackButton, hideBackButton } from './services/telegram';
import apiService from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [subscribeTariff, setSubscribeTariff] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        const telegramData = await initTelegramSDK();
        if (!telegramData) {
          console.warn('Telegram SDK not available');
          setIsLoading(false);
          return;
        }

        const telegramUser = getTelegramUser();
        const fallbackUser = telegramUser ? {
          userid: Number(telegramUser.id),
          id: telegramUser.id,
          first_name: telegramUser.firstName || '',
          last_name: telegramUser.lastName || null,
          username: telegramUser.username || null,
          tariff_plan: null,
          tariff_end_date: null,
        } : null;

        if (!telegramUser) {
          console.warn('Telegram user data not available');
          setIsLoading(false);
          return;
        }

        try {
          const existingUser = await apiService.getUser(telegramUser.id);
          setUser(existingUser);
        } catch (error) {
          const isUserNotFound = error.status === 404
            || /not found|user not found|пользователь не найден/i.test(error.message || '');
          if (isUserNotFound) {
            try {
              const newUser = await apiService.createUser({
                userid: String(telegramUser.id),
                first_name: telegramUser.firstName || '',
                last_name: telegramUser.lastName || null,
                username: telegramUser.username || null,
                tariff_plan: null,
                tariff_end_date: null,
              });
              setUser(newUser);
            } catch (createError) {
              console.error('Error creating user:', createError);
              setUser(fallbackUser);
            }
          } else {
            console.error('Error fetching user:', error);
            setUser(fallbackUser);
          }
        }
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (currentPage === 'home') {
      hideBackButton();
      return;
    }
    if (currentPage === 'profile') {
      showBackButton(() => setCurrentPage('home'));
      return;
    }
    if (currentPage === 'payment') {
      showBackButton(() => setCurrentPage('profile'));
      return;
    }
    if (currentPage === 'tariff') {
      showBackButton(() => setCurrentPage('home'));
      return;
    }
    if (currentPage === 'subscription') {
      showBackButton(() => {
        setSubscribeTariff(null);
        setCurrentPage('tariff');
      });
      return;
    }
    if (currentPage === 'setup') {
      showBackButton(() => setCurrentPage('home'));
    }
    return () => hideBackButton();
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="app">
        <div className="background"></div>
        <AppHeader title="BezNet VPN" />
        <div className="content">
          <Logo />
        </div>
      </div>
    );
  }

  if (currentPage === 'profile') {
    return (
      <ProfilePage 
        user={user} 
        onBack={() => setCurrentPage('home')} 
        onNavigateToPayment={() => setCurrentPage('payment')}
      />
    );
  }

  if (currentPage === 'payment') {
    return (
      <PaymentPage onBack={() => setCurrentPage('profile')} />
    );
  }

  if (currentPage === 'tariff') {
    return (
      <TariffSelectionPage
        onBack={() => setCurrentPage('home')}
        onNext={(tariffId) => {
          setSubscribeTariff(tariffId);
          setCurrentPage('subscription');
        }}
      />
    );
  }

  if (currentPage === 'subscription') {
    const subscribeUserId = user?.userid ?? user?.id;
    return (
      <SubscriptionSelectionPage
        onBack={() => {
          setSubscribeTariff(null);
          setCurrentPage('tariff');
        }}
        tariffId={subscribeTariff}
        userId={subscribeUserId}
      />
    );
  }

  if (currentPage === 'setup') {
    return (
      <SetupFlow 
        onBack={() => setCurrentPage('home')} 
        onComplete={() => setCurrentPage('home')}
        user={user}
      />
    );
  }

  return (
      <div className="app">
        <div className="background"></div>
        <AppHeader title="BezNet VPN" />
        <div className="content">
          <Logo />
          <div className="buttons-wrapper">
            <div className="buttons-container">
              <ServiceStatus user={user} />
              <SubscriptionButton user={user} onOpenSubscribe={() => setCurrentPage('tariff')} />
              <SetupButton onOpenSetup={() => setCurrentPage('setup')} />
              <div className="bottom-buttons">
                <ProfileButton onOpenProfile={() => setCurrentPage('profile')} />
                <SupportButton />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;

