import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://planos-backend.onrender.com/";

const api = axios.create({
  baseURL: BASE_URL,
});

export const useApi = () => ({
  validateToken: async (token) => {
    const response = await api.get("admin/is-admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  signIn: async (email, password) => {
    const response = await api.post("admin/login", { email, password });
    return response.data;
  },

  getPlans: async () => {
    const response = await api.get("plan/all");
    return response.data;
  },

  createPlans: async (
    title,
    cost,
    period,
    franchise,
    unlimitedApp,
    unlimitedCall,
    planType,
    priority,
    description,
    lines,
    providerLogo,
    city,
    provider
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("cost", cost);
    formData.append("period", period);
    formData.append("franchise", franchise);
    formData.append("unlimitedApp", unlimitedApp);
    formData.append("unlimitedCall", unlimitedCall);
    formData.append("planType", planType);
    formData.append("priority", priority);
    formData.append("description", description);
    formData.append("lines", lines);
    formData.append("provider", provider);
    formData.append("city", city);
    if (providerLogo instanceof Promise) {
      const resposta = await providerLogo;
      console.log(resposta);
      formData.append("providerLogo", resposta);
    } else {
      formData.append("providerLogo", providerLogo);
    }

    const response = await api.post("plan/new", formData);
    console.log(response);

    if (response.status !== 200) {
      toast.error(response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    return response.data;
  },

  getClients: async () => {
    const response = await api.get("lead/all");
    return response.data;
  },

  archivePlan: async (id) => {
    const response = await api.put("plan/archive", { id });
    return response.data;
  },

  editPlan: async (
    id,
    title,
    cost,
    period,
    franchise,
    unlimitedApps,
    unlimitedCall,
    planType,
    priority,
    description,
    lines
  ) => {
    const response = await api.put("plan/edit", {
      id,
      title,
      cost,
      period,
      franchise,
      unlimitedApps,
      unlimitedCall,
      planType,
      priority,
      description,
      lines,
    });

    if (response.status !== 200) {
      toast.error(response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    return response.data;
  },

  registerLead: async (name, cpf, dateOfBirth, motherName, cel, planId) => {
    const response = await api.post("lead/register", {
      name,
      cpf,
      dateOfBirth,
      motherName,
      cel,
      planId,
    });
    return response.data;
  },
});
