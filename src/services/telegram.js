let telegramSDK = null;
let initData = null;
let miniApp = null;

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

