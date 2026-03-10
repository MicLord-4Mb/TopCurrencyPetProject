from pydantic import BaseModel


# ---------------------------------------------------------------------------
# Crypto schemas
# ---------------------------------------------------------------------------

class USDQuote(BaseModel):
    price: float
    market_cap: float
    percent_change_24h: float


class Quote(BaseModel):
    USD: USDQuote


class CryptoListItem(BaseModel):
    """Элемент списка криптовалют (для меню)."""
    id: int
    name: str
    symbol: str
    cmc_rank: int | None = None
    quote: Quote


class CryptoDetail(CryptoListItem):
    """Расширенные данные криптовалюты (для карточки)."""
    slug: str | None = None


# ---------------------------------------------------------------------------
# Exchange Rate schemas
# ---------------------------------------------------------------------------

class ExchangeRatesResponse(BaseModel):
    """Ответ ExchangeRate API."""
    result: str
    base_code: str
    # Словарь: код валюты → курс к USD
    conversion_rates: dict[str, float]


class CurrencyCode(BaseModel):
    """Пара: код валюты → полное название."""
    code: str
    name: str

