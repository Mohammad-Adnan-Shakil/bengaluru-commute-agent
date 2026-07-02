import json
import os
from datetime import datetime

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "bottlenecks.json")

def check_bottleneck(corridor_id: str, departure_time: str) -> dict:
    """
    Checks if a known Bengaluru traffic corridor has active congestion
    at a given departure time, and returns delay estimate + alternates.

    Args:
        corridor_id: One of 'silk_board_orr', 'whitefield_stretch', 'hebbal', 'electronic_city'
        departure_time: Time in 24hr HH:MM format, e.g. '09:15'

    Returns:
        A dict with congestion status, delay multiplier, note, and alternate routes.
    """
    with open(DATA_PATH, "r") as f:
        data = json.load(f)

    corridor = next((c for c in data["corridors"] if c["id"] == corridor_id), None)
    if not corridor:
        return {"error": f"Unknown corridor: {corridor_id}. Valid options: silk_board_orr, whitefield_stretch, hebbal, electronic_city"}

    dep_time = datetime.strptime(departure_time, "%H:%M").time()

    for window in corridor["peak_windows"]:
        start = datetime.strptime(window["start"], "%H:%M").time()
        end = datetime.strptime(window["end"], "%H:%M").time()
        if start <= dep_time <= end:
            return {
                "corridor": corridor["name"],
                "congestion": "HIGH",
                "delay_multiplier": window["delay_multiplier"],
                "note": window["note"],
                "alternate_routes": corridor["alternate_routes"]
            }

    return {
        "corridor": corridor["name"],
        "congestion": "LOW",
        "delay_multiplier": 1.0,
        "note": "Outside known peak windows for this corridor — expect normal flow.",
        "alternate_routes": []
    }