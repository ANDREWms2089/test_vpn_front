const API_BASE_URL = 'https://api.real-2.space';

class ApiService {
  async request(endpoint, options = {}) {
    const method = options.method || 'GET';
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
      'Accept': 'application/json',
      ...options.headers,
    };

    if (method !== 'GET' && method !== 'HEAD') {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      method: method,
      mode: 'cors',
      credentials: 'omit',
      redirect: 'manual',
      headers: headers,
    };

    if (options.body) {
      if (typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
      } else {
        config.body = options.body;
      }
    }

    try {
      let response = await fetch(url, config);

      if (response.status === 307 || response.status === 308) {
        const redirectUrl = response.headers.get('Location');
        if (redirectUrl) {
          const redirectConfig = { ...config, redirect: 'follow' };
          response = await fetch(redirectUrl, redirectConfig);
        }
      }

      if (response.status === 0 || response.type === 'opaque') {
        throw new Error('CORS error: Unable to fetch resource');
      }

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { detail: text };
        }
      }

      if (!response.ok) {
        let msg = `HTTP error! status: ${response.status}`;
        if (data.detail) {
          if (Array.isArray(data.detail)) {
            msg = data.detail.map((d) => d.msg || JSON.stringify(d)).join('; ');
          } else if (typeof data.detail === 'string') {
            msg = data.detail;
          } else {
            msg = JSON.stringify(data.detail);
          }
        } else if (data.msg) {
          msg = data.msg;
        }
        const err = new Error(msg);
        err.status = response.status;
        throw err;
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async createUser(userData) {
    return this.request('/users/', {
      method: 'POST',
      body: userData,
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}/`);
  }

  async getReferralLink(userId) {
    return this.request(`/users/${userId}/referral-link/`);
  }

  async getReferralCount(userId) {
    return this.request(`/users/${userId}/referral-count/`);
  }

  async getTransactions(userId) {
    return this.request(`/users/${userId}/transactions/`);
  }

  async createKey(userId) {
    return this.request('/users/key/', {
      method: 'POST',
      body: { userid: Number(userId) },
    });
  }

  async subscriptionCheckout(body) {
    return this.request('/subscription/checkout/', {
      method: 'POST',
      body: {
        userid: Number(body.userid),
        tariff_plan: String(body.tariff_plan ?? 'basic'),
        duration_days: Number(body.duration_days),
        amount: String(body.amount),
        return_url: String(body.return_url ?? ''),
      },
    });
  }
}

export default new ApiService();
