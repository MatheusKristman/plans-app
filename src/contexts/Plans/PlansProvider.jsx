import {useState, useEffect, useReducer} from 'react';
import { PlansContext } from './PlansContext';
import { useApi } from '../../hooks/useApi';

export const PlansProvider = ({children}) => {
  const [allPlans, setAllPlans] = useState([]);
  const [planInfo, setPlanInfo] = useState([]);
  const [planId, setPlanId] = useState('');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [plansMenu, setPlansMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = useApi();
  const [reducerValue, forceUpdate] = useReducer((x) => {x + 1, 0})

  useEffect(() => {
    const getAllPlans = async () => {
      setLoading(true)
      const data = await api.getPlans();
      const {plans} = data;
      setAllPlans(plans);
      setLoading(false)
    }
    getAllPlans();
  }, [])

  const toFile = async (plan) => {
    setLoading(true)
    const data = await api.archivePlan(plan)
    setAllPlans(data)
    setLoading(false)
  }

  const handleSeeMore = (plan) => {
    setSeeMore(!seeMore)
    setPlanInfo(plan);
  }

  const handleEditMenu = (plan) => {
    setEditMenu(!editMenu)
    setIsEditing(!isEditing)
    setPlanId(plan?._id)
    if (seeMore) setSeeMore(!seeMore);
  }

  return (
    <PlansContext.Provider value={{allPlans, search, editMenu, seeMore, handleEditMenu,
      handleSeeMore, toFile, setSearch, isEditing, setIsEditing, planId, planInfo,
      plansMenu, setPlansMenu, setEditMenu, loading, setLoading, setAllPlans}}>
      {children}
    </PlansContext.Provider>
  )
}
