export function detectPlatform() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }
  
  if (/Win/.test(userAgent)) {
    return 'Windows';
  }
  
  if (/Mac/.test(userAgent)) {
    return 'macOS';
  }
  
  if (/Linux/.test(userAgent)) {
    return 'Linux';
  }
  
  return 'Unknown';
}

export function getPlatformText(platform) {
  const platformMap = {
    'iOS': 'для iOS',
    'Android': 'для Android',
    'Windows': 'для Windows',
    'macOS': 'для macOS',
    'Linux': 'для Linux',
    'Unknown': 'для устройства'
  };
  
  return platformMap[platform] || platformMap['Unknown'];
}

