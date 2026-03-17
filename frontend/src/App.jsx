import { useState, useCallback } from 'react';
import { Menu, Spin, Alert } from 'antd';

import CryptoCurrencyCard from "./components/CryptoCurrencyCard.jsx";
import ExchangeCurrencyCard from "./components/ExchangeCurrencyCard.jsx";
import { useCryptoData } from './hooks/useCryptoData.jsx';
import { useMenuData } from './hooks/useMenuData.jsx';

const App = () => {
    const [selectedItem, setSelectedItem] = useState({ type: 'crypto', id: '1' });

    const {
        menuItems,
        exchangeRates,
        codeToName,
        isLoading: isMenuLoading,
        error: menuError,
        refetch: refetchMenu
    } = useMenuData();

    const {
        data: cryptoData,
        isLoading: isCryptoLoading
    } = useCryptoData(selectedItem.type === 'crypto' ? selectedItem.id : null);

    const handleMenuClick = useCallback((e) => {
        const firstDash = e.key.indexOf('-');
        if (firstDash === -1) return;

        const type = e.key.substring(0, firstDash);
        const id = e.key.substring(firstDash + 1);

        if (type === 'crypto' || type === 'fiat') {
            setSelectedItem({ type, id });
        }
    }, []);

    const renderContent = () => {
        if (isCryptoLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                        <Spin size="large" description="Loading data..." />
                </div>
            );
        }

        if (selectedItem.type === 'crypto') {
            return cryptoData ? (
                <CryptoCurrencyCard crypto={cryptoData} />
            ) : (
                <Alert
                    title="No Data"
                    description="Unable to load cryptocurrency data"
                    type="warning"
                    showIcon
                />
            );
        }

        if (selectedItem.type === 'fiat') {
            const rate = exchangeRates?.[selectedItem.id];
            return rate ? (
                <ExchangeCurrencyCard
                    currencyCode={selectedItem.id}
                    currencyName={codeToName?.[selectedItem.id]}
                    rate={rate}
                />
            ) : (
                <Alert
                    title="No Data"
                    description="Exchange rate not available"
                    type="warning"
                    showIcon
                />
            );
        }
    };

    if (menuError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Alert
                    title="Error"
                    description={menuError}
                    type="error"
                    showIcon
                    action={
                        <button
                            onClick={refetchMenu}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <div className="h-screen overflow-y-auto bg-gray-50 border-r border-gray-200 shadow-sm">
                {isMenuLoading ? (
                    <div className="flex items-center justify-center h-64 w-64">
                        <Spin size="large" description="Loading menu..." />
                    </div>
                ) : (
                    <Menu
                        onClick={handleMenuClick}
                        style={{ width: 256, borderRight: 0 }}
                        defaultSelectedKeys={['crypto-1']}
                        defaultOpenKeys={['sub-crypto']}
                        mode="inline"
                        items={menuItems}
                    />
                )}
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;
