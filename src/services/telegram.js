let telegramSDK = null;
let initData = null;
let miniApp = null;
let backButton = null;
let hapticFeedback = null;
let backButtonClickOff = null;

function parseUser(user) {
  if (!user) return null;
  const id = user.id;
  const firstName = user.firstName ?? user.first_name ?? '';
  const lastName = user.lastName ?? user.last_name ?? '';
  const username = user.username ?? '';
  return {
    id,
    firstName,
    lastName,
    username,
    languageCode: user.languageCode || user.language_code || 'ru',
    isBot: user.isBot ?? user.is_bot ?? false,
    isPremium: user.isPremium ?? user.is_premium ?? false,
  };
}

export async function initTelegramSDK() {
  try {
    const sdk = await import('@tma.js/sdk');
    telegramSDK = sdk;
    const miniAppResult = await sdk.initMiniApp();
    miniApp = miniAppResult;
    const initDataResult = await sdk.initInitData();
    initData = initDataResult;
    if (typeof sdk.initBackButton === 'function') {
      const initBB = sdk.initBackButton();
      const pair = typeof initBB === 'function' ? initBB() : initBB;
      const raw = Array.isArray(pair) ? pair[0] : pair;
      if (raw && typeof raw.then === 'function') {
        backButton = await raw;
      } else {
        backButton = raw;
      }
    }
    if (typeof sdk.initHapticFeedback === 'function') {
      const getHf = sdk.initHapticFeedback();
      hapticFeedback = typeof getHf === 'function' ? getHf() : getHf;
    }
    return { initData: initDataResult, miniApp: miniAppResult };
  } catch (error) {
    console.error('Telegram SDK initialization error:', error);
    return null;
  }
}

export function getTelegramUser() {
  let user = null;
  if (initData && typeof initData.user !== 'undefined') {
    user = initData.user;
  }
  if (!user && telegramSDK && typeof telegramSDK.retrieveLaunchParams === 'function') {
    try {
      const params = telegramSDK.retrieveLaunchParams();
      user = params.initData?.user;
    } catch (_) {}
  }
  if (!user && typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
    user = window.Telegram.WebApp.initDataUnsafe.user;
  }
  return parseUser(user);
}

export function getInitData() {
  return initData;
}

export function getMiniApp() {
  return miniApp;
}

export function triggerHaptic(style = 'light') {
  try {
    if (hapticFeedback && typeof hapticFeedback.impactOccurred === 'function') {
      hapticFeedback.impactOccurred(style);
      return;
    }
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback?.impactOccurred) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
    }
  } catch (_) {}
}

export function showBackButton(onClick) {
  try {
    if (backButton && typeof backButton.show === 'function') {
      if (typeof backButtonClickOff === 'function') {
        backButtonClickOff();
        backButtonClickOff = null;
      }
      if (typeof onClick === 'function') {
        const handler = () => {
          triggerHaptic();
          onClick();
        };
        if (typeof backButton.on === 'function') {
          backButtonClickOff = backButton.on('click', handler);
          if (typeof backButtonClickOff !== 'function') {
            backButtonClickOff = () => backButton.off('click', handler);
          }
        }
      }
      backButton.show();
      return;
    }
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.BackButton) {
      const bb = window.Telegram.WebApp.BackButton;
      if (typeof onClick === 'function') {
        if (typeof bb.offClick === 'function') bb.offClick();
        bb.onClick(() => {
          triggerHaptic();
          onClick();
        });
      }
      bb.show();
    }
  } catch (_) {}
}

export function hideBackButton() {
  try {
    if (backButton && typeof backButton.hide === 'function') {
      if (typeof backButtonClickOff === 'function') {
        backButtonClickOff();
        backButtonClickOff = null;
      }
      backButton.hide();
      return;
    }
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.BackButton) {
      if (typeof window.Telegram.WebApp.BackButton.offClick === 'function') {
        window.Telegram.WebApp.BackButton.offClick();
      }
      window.Telegram.WebApp.BackButton.hide();
    }
  } catch (_) {}
}

