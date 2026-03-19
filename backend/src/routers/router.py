from fastapi import APIRouter, Depends, HTTPException
from backend.src.dependencies import get_cmc_client, get_er_client
from backend.src.http_client import CMCHTTPClient, ERHTTPClient
from backend.src.schemas.schemas import CryptoListItem, CryptoDetail, ExchangeRatesResponse, CurrencyCode

router = APIRouter(
    prefix="/api/v1",
    tags=["Finance Data"]
)


@router.get("/crypto", response_model=list[CryptoListItem])
async def get_cryptocurrencies(
        cmc_client: CMCHTTPClient = Depends(get_cmc_client)
):
    """List of top cryptocurrencies by market capitalization."""
    try:
        return await cmc_client.get_listings()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"CMC API error: {e}")


@router.get("/crypto/{currency_id}", response_model=CryptoDetail)
async def get_cryptocurrency(
        currency_id: int,
        cmc_client: CMCHTTPClient = Depends(get_cmc_client)
):
    """Detailed information and price quote for a specific cryptocurrency."""
    try:
        return await cmc_client.get_currency(currency_id)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"CMC API error: {e}")


@router.get("/exchange", response_model=ExchangeRatesResponse)
async def get_exchange(
        er_client: ERHTTPClient = Depends(get_er_client)
):
    """Exchange rates relative to USD."""
    try:
        return await er_client.get_latest()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"ExchangeRate API error: {e}")


@router.get("/codes", response_model=list[CurrencyCode])
async def get_codes(
        er_client: ERHTTPClient = Depends(get_er_client)
):
    """List of supported currency codes."""
    try:
        raw = await er_client.get_cur_sup()
        # raw = [["USD", "United States Dollar"], ...]
        return [{"code": item[0], "name": item[1]} for item in raw]
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"ExchangeRate API error: {e}")
