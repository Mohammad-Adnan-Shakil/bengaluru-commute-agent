import os
import requests
from dotenv import load_dotenv

load_dotenv()

ORS_API_KEY = os.getenv("ORS_API_KEY")
ORS_BASE_URL = "https://api.openrouteservice.org/v2/directions/driving-car"

def get_route(origin_lon: float, origin_lat: float, dest_lon: float, dest_lat: float) -> dict:
    """
    Fetches a driving route between two coordinates using OpenRouteService.

    Args:
        origin_lon: Origin longitude
        origin_lat: Origin latitude
        dest_lon: Destination longitude
        dest_lat: Destination latitude

    Returns:
        A dict with distance (meters), duration (seconds), and route summary.
    """
    headers = {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
    }
    body = {
        "coordinates": [[origin_lon, origin_lat], [dest_lon, dest_lat]]
    }

    response = requests.post(ORS_BASE_URL, json=body, headers=headers)

    if response.status_code != 200:
        return {"error": f"ORS request failed: {response.status_code} - {response.text}"}

    data = response.json()
    summary = data["routes"][0]["summary"]

    return {
        "distance_km": round(summary["distance"] / 1000, 2),
        "duration_min": round(summary["duration"] / 60, 1),
        "raw_summary": summary
    }