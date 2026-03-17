import {Card, Avatar, Statistic, Tooltip} from "antd";
import {DollarOutlined, SwapOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';


function ExchangeCurrencyCard({currencyCode, currencyName, rate}) {

    const formattedRate = rate.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    });

    const reverseRate = (1 / rate).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    });

    return (
        <Card
            title={
                <div className="flex items-center gap-3">
                    <Avatar
                        icon={<DollarOutlined/>}
                        style={{backgroundColor: '#1677ff'}}
                        size="large"
                    />
                    <div>
                        <div className="font-semibold text-lg">
                            {currencyCode} / USD
                        </div>
                        <div className="text-sm text-gray-500">
                            {currencyName ?? 'Exchange Rate'}
                        </div>
                    </div>
                </div>
            }
            style={{width: 350}}
            className="shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="space-y-4">
                <Tooltip title={`1 ${currencyCode} equals ${formattedRate} USD`}>
                    <Statistic
                        title={`1 ${currencyCode} =`}
                        value={formattedRate}
                        suffix="USD"
                        precision={rate < 0.01 ? 6 : 4}
                        styles={{
                            content: {color: '#1677ff', fontSize: '24px'},
                            title: {marginBottom: '8px'}
                        }}
                    />
                </Tooltip>

                <div className="flex items-center justify-center text-gray-400">
                    <SwapOutlined className="text-xl"/>
                </div>

                <Tooltip title={`1 USD equals ${reverseRate} ${currencyCode}`}>
                    <Statistic
                        title="1 USD ="
                        value={reverseRate}
                        suffix={currencyCode}
                        precision={1 / rate < 0.01 ? 6 : 4}
                        styles={{
                            content: {color: '#52c41a', fontSize: '24px'},
                            title: {marginBottom: '8px'}
                        }}
                    />
                </Tooltip>

                <div className="text-xs text-gray-400 mt-4 pt-3 border-t">
                    Base currency: USD
                </div>
            </div>
        </Card>
    );
}

ExchangeCurrencyCard.propTypes = {
    currencyCode: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
};

export default ExchangeCurrencyCard;

