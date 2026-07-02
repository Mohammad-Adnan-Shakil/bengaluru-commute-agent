from dotenv import load_dotenv
load_dotenv()

from google.adk.agents import Agent
from .tools.ors_tool import get_route
from .tools.bottleneck_tool import check_bottleneck
from .tools.monitor_tool import compare_departure_times

root_agent = Agent(
    name="commute_agent",
    model="gemini-2.5-flash",
    description="Agent that helps plan Bengaluru commutes.",
    instruction=(
        "You are a Bengaluru commute planning assistant. "
        "When the user asks about travel between two locations, use get_route "
        "to fetch distance and duration. "
        "If the route passes through a known corridor "
        "(silk_board_orr, whitefield_stretch, hebbal, electronic_city) "
        "and the user gives a departure time, use check_bottleneck to assess "
        "congestion risk and suggest alternates if needed. "
        "If the user asks to compare two possible departure times, or asks "
        "'should I leave earlier/later instead', use compare_departure_times "
        "to evaluate both options and recommend the better one. "
        "Combine tool outputs into a clear recommendation: adjusted ETA "
        "accounting for delay multiplier, and whether to consider an "
        "alternate route or different departure time. "
        "Convert place names to approximate lat/lon coordinates yourself if the "
        "user gives place names instead of coordinates."
    ),
    tools=[get_route, check_bottleneck, compare_departure_times]
)