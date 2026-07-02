from .bottleneck_tool import check_bottleneck

def compare_departure_times(corridor_id: str, time_option_1: str, time_option_2: str) -> dict:
    """
    Compares congestion conditions between two possible departure times
    for the same corridor, to help decide whether delaying or advancing
    departure improves the commute.

    Args:
        corridor_id: One of 'silk_board_orr', 'whitefield_stretch', 'hebbal', 'electronic_city'
        time_option_1: First departure time to compare, HH:MM 24hr format
        time_option_2: Second departure time to compare, HH:MM 24hr format

    Returns:
        A dict with both options' congestion status and a recommendation
        on which is better.
    """
    option_1 = check_bottleneck(corridor_id, time_option_1)
    option_2 = check_bottleneck(corridor_id, time_option_2)

    if "error" in option_1 or "error" in option_2:
        return {"error": "Invalid corridor or time format."}

    better_option = time_option_1 if option_1["delay_multiplier"] <= option_2["delay_multiplier"] else time_option_2

    return {
        "option_1": {"time": time_option_1, **option_1},
        "option_2": {"time": time_option_2, **option_2},
        "recommendation": f"Leaving at {better_option} is better based on current known congestion patterns."
    }