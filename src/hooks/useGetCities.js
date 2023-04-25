import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://brasilapi.com.br/api/ibge/municipios/v1/";

const api = axios.create({
  baseURL: BASE_URL,
})

export const useGetCities = ({uf}) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!uf) return

    setLoading(true);
    const response = api.get(`${uf}`)
    .then((response) => setCities(response.data))
    .then(() => setLoading(false))
  }, [uf])

  return{
    cities,
    loading
  }
}
