import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { username: string; email: string; password: string }) =>
    api.post('/auth/register', userData)
};

export const knowledgeAPI = {
  getGraph: () => api.get('/knowledge/graph'),
  getTopic: (id: string) => api.get(`/knowledge/topics/${id}`)
};

export const learningAPI = {
  getUserProgress: () => api.get('/learning/progress'),
  updateProgress: (data: any) => api.post('/learning/progress', data)
};

export const aiAPI = {
  chat: (message: string) => 
    api.post('/ai/chat', { message })
}; 