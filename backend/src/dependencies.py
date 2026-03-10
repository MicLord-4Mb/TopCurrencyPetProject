from fastapi import Request
from backend.src.http_client import CMCHTTPClient, ERHTTPClient


def get_cmc_client(request: Request) -> CMCHTTPClient:
    return request.app.state.cmc_client


def get_er_client(request: Request) -> ERHTTPClient:
    return request.app.state.er_client
