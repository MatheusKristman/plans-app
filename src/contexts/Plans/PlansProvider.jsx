import {useState, useEffect, useReducer, useContext} from 'react';
import { PlansContext } from './PlansContext';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../Auth/AuthContext';

export const PlansProvider = ({children}) => {
  const [allPlans, setAllPlans] = useState([]);
  const api = useApi();
  const auth = useContext(AuthContext)
  const [reducerValue, forceUpdate] = useReducer((x) => {x + 1, 0})

  useEffect(() => {
    const getAllPlans = async () => {
      const data = await api.getPlans();
      setAllPlans(data);
    }

    getAllPlans();
  }, [])

  const getArchivedPlans = () => {

  }

  return (
    <PlansContext.Provider value={allPlans}>
      {children}
    </PlansContext.Provider>
  )
}
