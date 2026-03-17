import { Card, Tag, Tooltip } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" rx="32" fill="#f0f0f0"/>' +
    '<text x="32" y="38" text-anchor="middle" font-size="24" fill="#999">?</text>' +
    '</svg>'
)}`;


function CryptoCurrencyCard({ crypto }) {
    const price = crypto.quote?.USD?.price ?? 0;
    const marketCap = crypto.quote?.USD?.market_cap ?? 0;
    const change24h = crypto.quote?.USD?.percent_change_24h ?? 0;

    const formattedPrice = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const formattedMarketCap = marketCap.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short'
    });

    const isPriceUp = change24h > 0;
//    const priceChangeColor = isPriceUp ? '#52c41a' : '#ff4d4f';
    const PriceIcon = isPriceUp ? ArrowUpOutlined : ArrowDownOutlined;

    return (
        <Card
            title={
                <div className="flex items-center gap-3">
                    <img
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                        alt={crypto.name}
                        className="w-10 h-10"
                        onError={(e) => {
                            e.target.src = FALLBACK_IMAGE;
                        }}
                    />
                    <div>
                        <div className="font-semibold text-lg">{crypto.name}</div>
                        <div className="text-sm text-gray-500">{crypto.symbol}</div>
                    </div>
                </div>
            }
            style={{ width: 350 }}
            className="shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Price:</span>
                    <span className="font-bold text-lg">{formattedPrice}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-600">24h Change:</span>
                    <Tooltip title="Price change in last 24 hours">
                        <Tag
                            color={isPriceUp ? 'success' : 'error'}
                            icon={<PriceIcon />}
                            className="font-semibold"
                        >
                            {Math.abs(change24h).toFixed(2)}%
                        </Tag>
                    </Tooltip>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Market Cap:</span>
                    <span className="font-semibold">{formattedMarketCap}</span>
                </div>

                <div className="text-xs text-gray-400 mt-4 pt-3 border-t">
                    Rank: #{crypto.cmc_rank || 'N/A'}
                </div>
            </div>
        </Card>
    );
}

CryptoCurrencyCard.propTypes = {
    crypto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        cmc_rank: PropTypes.number,
        quote: PropTypes.shape({
            USD: PropTypes.shape({
                price: PropTypes.number.isRequired,
                market_cap: PropTypes.number.isRequired,
                percent_change_24h: PropTypes.number.isRequired,
            }).isRequired
        }).isRequired
    }).isRequired
};

export default CryptoCurrencyCard;
