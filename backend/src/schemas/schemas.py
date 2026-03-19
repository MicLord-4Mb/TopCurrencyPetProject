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
    """Cryptocurrency list item (for menus)."""
    id: int
    name: str
    symbol: str
    cmc_rank: int | None = None
    quote: Quote


class CryptoDetail(CryptoListItem):
    """Extended cryptocurrency data (for detail cards)."""
    slug: str | None = None


# ---------------------------------------------------------------------------
# Exchange Rate schemas
# ---------------------------------------------------------------------------

class ExchangeRatesResponse(BaseModel):
    """ExchangeRate API response."""
    result: str
    base_code: str
    # Dict: currency code → exchange rate to USD
    conversion_rates: dict[str, float]


class CurrencyCode(BaseModel):
    """Pair: currency code → full name."""
    code: str
    name: str
