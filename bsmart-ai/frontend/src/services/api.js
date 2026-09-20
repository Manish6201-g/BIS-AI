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

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
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
