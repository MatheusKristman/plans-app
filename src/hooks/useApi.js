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
  }
})
