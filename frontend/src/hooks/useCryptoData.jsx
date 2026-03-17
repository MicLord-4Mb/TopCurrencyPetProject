import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { fetchAPI } from '../api/client.jsx';


export function useCryptoData(id) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCrypto = useCallback(async (cryptoId) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchAPI(`/api/v1/crypto/${cryptoId}`);
            setData(result);
        } catch (err) {
            console.error('Crypto fetch error:', err);
            setError(err.message);
            message.error('Failed to load cryptocurrency details');
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id !== null && id !== undefined) {
            fetchCrypto(id);
        }
    }, [id, fetchCrypto]);

    return { data, isLoading, error };
}
