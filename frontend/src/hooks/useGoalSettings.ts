import { useEffect, useState } from 'react';
import api from '../axiosInstance';

export function useGoalSettings() {
    const [goalType, setGoalType] = useState('count');
    const [goalValue, setGoalValue] = useState(3);

    useEffect(() => {
        const fetchGoal = async () => {
            const res = await api.get('/goals');
            if (res.data?.type && res.data?.value) {
                setGoalType(res.data.type);
                setGoalValue(res.data.value);
            }
        };
        fetchGoal();
    }, []);

    const saveGoal = async () => {
        await api.post('/goals', { type: goalType, value: goalValue });
    };

    return {
        goalType,
        setGoalType,
        goalValue,
        setGoalValue,
        saveGoal,
    };
}
