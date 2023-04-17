import axios from "axios";

const BASE_URL = 'https://planos-backend.onrender.com/'

const api = axios.create({
  baseURL: BASE_URL,
})

export const useApi = () => ({
  validateToken: async (token) => {
    const response = await api.get('admin/is-admin', {headers:{Authorization: `Bearer ${token}`}});
    return response.data
  },
  signIn: async (email, password) => {
    const response = await api.post('admin/login', {email, password});
    return response.data
  },
  getPlans: async () => {
    const response = await api.get('plan/all');
    return response.data
  },
  createPlans: async (title, cost,
      period, franchise, unlimitedApps, unlimitedCall,
      planType, priority, description, lines, providerLogo, city, provider) => {
    const response = await api.post('plan/edit', {body: {
      title, cost, period, franchise, unlimitedApps, unlimitedCall,
      planType, priority, description, lines, city, provider
    },
    file: {
      providerLogo
    }
  })
    return response.data
  }
})
