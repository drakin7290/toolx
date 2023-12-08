export const API_ROOT = process.env.SERVER_URI;

export const TIMEOUT = 15000;

export const API = {
  BANNER: '/banner',
  LOGIN: '/customer/login',
  GROUP: {
    LIST: '/group/list',
    JOIN: '/group/join/:code',
    EXIT: '/group/exit'
  },
  MISSION: {
    LIST: '/mission/list',
    VERIFY: '/mission/verify-mission'
  },
  USER: {
    GET: '/customer/profile'
  }
};
