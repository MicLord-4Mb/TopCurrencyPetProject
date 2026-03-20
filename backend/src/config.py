from typing import List

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


# TTL cache in millisecond
LISTINGS_TTL = 86400    # List of all cryptocurrencies — 24-hour cache
CURRENCY_TTL = 3600     # Quote for a specific coin — 1-hour cache
EXCHANGE_TTL = 86400    # Exchange rates change rarely — 24-hour cache


class Settings(BaseSettings):
    # ✅ SecretStr hides the value during logging and repr()
    # To use: settings.CMC_API_KEY.get_secret_value()
    CMC_API_KEY: SecretStr
    ER_API_KEY: SecretStr

    cors_origins: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]
    environment: str = "development"
    debug: bool = False
    cache_ttl: int = 300
    vite_api_base_url: str = ""

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()
