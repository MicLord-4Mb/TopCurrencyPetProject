from typing import List

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


# TTL кэша в секундах
LISTINGS_TTL = 86400    # Список всех криптовалют — кэш на сутки
CURRENCY_TTL = 3600     # Котировка конкретной монеты — кеш на час
EXCHANGE_TTL = 86400    # Курсы валют меняются редко — кэш на сутки


class Settings(BaseSettings):
    # ✅ SecretStr скрывает значение при логировании и repr()
    # Для использования: settings.CMC_API_KEY.get_secret_value()
    CMC_API_KEY: SecretStr
    ER_API_KEY: SecretStr

    cors_origins: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]
    environment: str = "development"
    debug: bool = False
    cache_ttl: int = 300

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()
