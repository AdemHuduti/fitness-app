import { useEffect, useState } from 'react';
import api from '../axiosInstance';

export function useGoal(refreshTrigger: boolean) {
    const [goal, setGoal] = useState<any>(null);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await api.get('/goals');
                setGoal(response.data);
            } catch (error) {
                console.error('Failed to fetch goal:', error);
            }
        };

        fetchGoal();
    }, [refreshTrigger]);

    return goal;
}
