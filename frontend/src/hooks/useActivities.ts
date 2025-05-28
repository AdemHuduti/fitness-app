import {  useState, useCallback } from 'react';
import api from '../axiosInstance';

export function useActivities() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchActivities = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get('/activities');
            setActivities(res.data);
            setLoading(false);
        } catch (err: any) {
            setError(err);
            setLoading(false);
        }
    }, []);

    const addActivity = async (activity: any) => {
        try {
            const res = await api.post('/activities', activity);
            setActivities(prev => [...prev, res.data]);
            setSuccessMessage('Activity added successfully!');
        } catch (err: any) {
            setError(err);
            setSuccessMessage('Failed to add activity.');
        }
    };

    const deleteActivity = async (id: string) => {
        try {
            await api.delete(`/activities/${id}`);
            setActivities(prev => prev.filter(a => a._id !== id));
        } catch (err: any) {
            setError(err);
        }
    };



    // useEffect(() => {
    //     fetchActivities();
    // }, [fetchActivities]);

    return {
        activities,
        loading,
        error,
        successMessage,
        fetchActivities,
        addActivity,
        deleteActivity,
    };
}
