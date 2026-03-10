from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.src.config import settings
from backend.src.http_client import CMCHTTPClient, ERHTTPClient
from backend.src.routers.router import router

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


# ✅ Исправлено: try/finally гарантирует закрытие сессий даже при ошибке
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.cmc_client = CMCHTTPClient(
        base_url='https://pro-api.coinmarketcap.com',
        api_key=settings.CMC_API_KEY.get_secret_value()
    )
    app.state.er_client = ERHTTPClient(
        base_url='https://v6.exchangerate-api.com',
        api_key=settings.ER_API_KEY.get_secret_value()
    )
    try:
        yield
    finally:
        # Закрываем HTTP сессии при завершении приложения
        await app.state.cmc_client._session.close()
        await app.state.er_client._session.close()


app = FastAPI(lifespan=lifespan)

# ✅ Исправлено: middleware регистрируется ДО роутеров
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
