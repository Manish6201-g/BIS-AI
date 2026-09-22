import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for JWT authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bismart_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for automatic silent token refresh on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401, not a retry, and not an auth endpoint
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('bismart_refresh_token');
      if (!refreshToken) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const res = await axios.post('/api/auth/refresh', { refresh_token: refreshToken });
        const { access_token, refresh_token: newRefreshToken, user } = res.data;

        localStorage.setItem('bismart_token', access_token);
        localStorage.setItem('bismart_refresh_token', newRefreshToken);
        if (user) {
          localStorage.setItem('bismart_user', JSON.stringify(user));
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

        processQueue(null, access_token);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('bismart_token');
        localStorage.removeItem('bismart_refresh_token');
        localStorage.removeItem('bismart_user');
        window.dispatchEvent(new Event('bismart_auth_logout'));
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/me', userData),
  refresh: (refreshToken) => api.post('/auth/refresh', { refresh_token: refreshToken }),
  logout: (refreshToken) => api.post('/auth/logout', { refresh_token: refreshToken }),
};

export const chatService = {
  sendMessage: (query, language, sessionId) => 
    api.post('/chat', { query, language, session_id: sessionId }),
  getHistory: (sessionId) => 
    api.get('/chat/history', { params: { session_id: sessionId } }),
  submitFeedback: (messageId, rating, comment) =>
    api.post('/feedback', { message_id: messageId, rating, comment }),
};

export const standardsService = {
  search: (q, category, mandatoryOnly) => 
    api.get('/standards', { params: { q, category, mandatory_only: mandatoryOnly } }),
  getById: (id) => api.get(`/standards/${id}`),
  getClauses: (id, clauseNo) => 
    api.get(`/standards/${id}/clauses`, { params: { clause_no: clauseNo } }),
};

export const matcherService = {
  matchProduct: (productData) => api.post('/product/match-standard', productData),
};

export const verificationService = {
  verifyISI: (cmlNumber, productHint) => 
    api.post('/verify/isi', { cml_number: cmlNumber, product_hint: productHint }),
  verifyHUID: (huid) => 
    api.post('/verify/huid', { huid }),
};

export const certificationService = {
  start: (productName, isNumber) => 
    api.post('/certification/start', { product_name: productName, is_number: isNumber }),
  getWorkflow: (id) => api.get(`/certification/${id}`),
  updateStep: (id, step, data) => 
    api.put(`/certification/${id}`, { step, data }),
  getSummary: (id) => api.post(`/certification/${id}/generate-summary`),
};

export const adminService = {
  uploadDocument: (formData) => 
    api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  listDocuments: () => api.get('/admin/documents'),
  deleteDocument: (id) => api.delete(`/admin/documents/${id}`),
};

export const analyticsService = {
  getSummary: () => api.get('/analytics'),
};

export default api;
