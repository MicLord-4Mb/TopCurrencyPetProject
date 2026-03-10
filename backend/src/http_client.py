from aiohttp import ClientSession
from aiocache import cached

from backend.src.config import LISTINGS_TTL, CURRENCY_TTL, EXCHANGE_TTL


class HTTPClient:
    def __init__(self, base_url: str, headers: dict = None):
        self._session = ClientSession(
            base_url=base_url,
            headers=headers or {}
        )


class CMCHTTPClient(HTTPClient):
    def __init__(self, base_url: str, api_key: str):
        super().__init__(base_url, headers={'X-CMC_PRO_API_KEY': api_key})

    # ✅ Исправлено: aiocache вместо alru_cache
    # alru_cache на методах экземпляра держит ссылку на self → утечка памяти
    # aiocache кэширует по аргументам без привязки к экземпляру
    @cached(ttl=LISTINGS_TTL)
    async def get_listings(self):
        async with self._session.get('/v1/cryptocurrency/listings/latest') as response:
            response.raise_for_status()
            result = await response.json()
            return result['data']

    @cached(ttl=CURRENCY_TTL)
    async def get_currency(self, currency_id: int):
        async with self._session.get(
                '/v2/cryptocurrency/quotes/latest',
                params={'id': currency_id}
        ) as response:
            response.raise_for_status()
            result = await response.json()
            return result['data'][str(currency_id)]


class ERHTTPClient(HTTPClient):

    def __init__(self, base_url: str, api_key: str):
        super().__init__(base_url)
        self.api_key = api_key

    @cached(ttl=EXCHANGE_TTL)
    async def get_latest(self):
        async with self._session.get(f'/v6/{self.api_key}/latest/USD') as response:
            response.raise_for_status()
            result = await response.json()
            return result

    @cached(ttl=EXCHANGE_TTL)
    async def get_cur_sup(self):
        async with self._session.get(f'/v6/{self.api_key}/codes') as response:
            response.raise_for_status()
            result = await response.json()
            return result['supported_codes']

