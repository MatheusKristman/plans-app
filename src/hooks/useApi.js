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
    const formData = new FormData();
    formData.append("title", title);
    formData.append("cost", cost);
    formData.append("period", period,);
    formData.append("franchise", franchise);
    formData.append("unlimitedApps", unlimitedApps);
    formData.append("unlimitedCall", unlimitedCall);
    formData.append("planType", planType);
    formData.append("priority", priority);
    formData.append("description", description);
    formData.append("lines", lines);
    formData.append("providerLogo", providerLogo);
    formData.append("city", city);
    formData.append("provider", provider);

    const response = await api.post('plan/new', {body: FormData});
    console.log(response.data)
    return response.data
  }
})
