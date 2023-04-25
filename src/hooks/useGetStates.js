import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://brasilapi.com.br/api/ibge/uf/v1";

const api = axios.create({
  baseURL: BASE_URL,
})

export const useGetStates = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const response = api.get()
    .then((response) => setStates(response.data))
  }, [])

  return{
    states
  }
}
