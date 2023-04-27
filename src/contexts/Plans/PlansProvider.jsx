import { useState, useEffect } from 'react';
import { PlansContext } from './PlansContext';
import { useApi } from '../../hooks/useApi';

export const PlansProvider = ({ children }) => {
    const [allPlans, setAllPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [planInfo, setPlanInfo] = useState([]);
    const [planId, setPlanId] = useState('');
    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editMenu, setEditMenu] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const [plansMenu, setPlansMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchPlans, setSearchPlans] = useState(false);
    const [initialFilterOptions, setInitialFilterOptions] = useState({});
    const [selectedPlans, setSelectedPlans] = useState([]);

    const api = useApi();

    useEffect(() => {
        const getAllPlans = async () => {
            setLoading(true);
            const data = await api.getPlans();
            const { plans } = data;
            setAllPlans(plans);
            setLoading(false);
        };
        getAllPlans();
    }, []);

    const toFile = async (plan) => {
        setLoading(true);
        const data = await api.archivePlan(plan);
        setAllPlans(data);
        setLoading(false);
    };

    const handleSeeMore = (plan) => {
        setSeeMore(!seeMore);
        setPlanInfo(plan);
    };

    const handleEditMenu = (plan) => {
        setPlansMenu(false);
        setEditMenu(!editMenu);
        setIsEditing(!isEditing);
        setPlanId(plan?._id);
        if (seeMore) setSeeMore(!seeMore);
    };

    const handleNewPlan = () => {
        setEditMenu(false);
        setIsEditing(false);
        setPlansMenu(!plansMenu);
    };

    return (
        <PlansContext.Provider
            value={{
                allPlans,
                search,
                editMenu,
                seeMore,
                handleEditMenu,
                handleSeeMore,
                toFile,
                setSearch,
                isEditing,
                setIsEditing,
                planId,
                planInfo,
                plansMenu,
                filteredPlans,
                initialFilterOptions,
                setFilteredPlans,
                setInitialFilterOptions,
                setPlansMenu,
                setEditMenu,
                loading,
                setLoading,
                setAllPlans,
                searchPlans,
                setSearchPlans,
                handleNewPlan,
                selectedPlans,
                setSelectedPlans,
                setPlanId,
            }}
        >
            {children}
        </PlansContext.Provider>
    );
};
