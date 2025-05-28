import { useState, useEffect } from 'react';
import api from '../axiosInstance';

export function useActivity(id: string | undefined) {
    const [activity, setActivity] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!id) return;

        const fetchActivity = async () => {
            try {
                const response = await api.get(`/activities/${id}`);
                setActivity(response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [id]);

    const saveActivity = async () => {
        if (!id || !activity) return;

        try {
            await api.put(`/activities/${id}`, activity);
            setMessage('Activity saved successfully!');
        } catch (err: any) {
            setError(err);
            setMessage('Failed to save activity.');
        }
    };

    return {
        activity,
        setActivity,
        message,
        loading,
        error,
        saveActivity,
    };
}
