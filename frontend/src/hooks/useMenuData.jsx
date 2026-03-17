import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { FundViewOutlined, DollarOutlined } from '@ant-design/icons';
import { fetchAPI } from '../api/client.jsx';

const POPULAR_CURRENCIES = ['EUR', 'GBP', 'ILS', 'JPY', 'CNY', 'RUB', 'AUD', 'CAD', 'CHF'];


export function useMenuData() {
    const [menuItems, setMenuItems] = useState([]);
    const [exchangeRates, setExchangeRates] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [codeToName, setCodeToName] = useState({});

    const fetchMenuData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [cryptoList, exchangeData, currencyCodes] = await Promise.all([
                fetchAPI('/api/v1/crypto'),
                fetchAPI('/api/v1/exchange'),
                fetchAPI('/api/v1/codes')
            ]);

            const cryptoMenu = {
                key: 'sub-crypto',
                label: 'Crypto Currency',
                icon: <FundViewOutlined />,
                children: cryptoList.slice(0, 20).map(c => ({
                    key: `crypto-${c.id}`,
                    label: `${c.name} (${c.symbol})`
                }))
            };

            const rates = exchangeData.conversion_rates || exchangeData;
            setExchangeRates(rates);

            // Vocabulary: { "EUR": "Euro", "ILS": "Israel New Shekel", ...}
            const codeToName = Object.fromEntries(
                currencyCodes.map(({ code, name}) => [code, name])
            );
            setCodeToName(codeToName);

            const fiatMenu = {
                key: 'sub-fiat',
                label: 'Fiat Rates (USD)',
                icon: <DollarOutlined />,
                children: Object.keys(rates)
                    .filter(code => POPULAR_CURRENCIES.includes(code))
                    .map(code => ({
                        key: `fiat-${code}`,
                        label: codeToName[code] ? `${codeToName[code]} (${code})`: code
                    }))
            };

            setMenuItems([cryptoMenu, fiatMenu]);

        } catch (err) {
            console.error('Menu fetch error:', err);
            setError('Failed to load navigation menu. Please check your backend connection.');
            message.error('Failed to load menu data');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMenuData();
    }, [fetchMenuData]);

    return { menuItems, exchangeRates, codeToName, isLoading, error, refetch: fetchMenuData };
}

