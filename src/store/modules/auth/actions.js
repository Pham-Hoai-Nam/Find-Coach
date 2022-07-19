import { FIREBASE_SIGNUP_API, FIREBASE_LOGIN_API } from '@/constants';
let timer;
export default {
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },
  async signUp(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('SET_USER', {
      userId: null,
      token: null,
      // tokenExpiration: null,
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    const user = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    let url = FIREBASE_LOGIN_API;
    if (mode == 'signup') {
      url = FIREBASE_SIGNUP_API;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 10000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('SET_USER', {
      token: responseData.idToken,
      userId: responseData.localId,
      // tokenExpiration: expirationDate,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('SET_USER', {
        token,
        userId,
        // tokenExpiration: null,
      });
    }
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('SET_AUTO_LOGOUT');
  },
};
