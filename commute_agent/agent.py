from dotenv import load_dotenv
load_dotenv()

from google.adk.agents import Agent
from .tools.ors_tool import get_route
from .tools.bottleneck_tool import check_bottleneck

root_agent = Agent(
    name="commute_agent",
    model="gemini-2.5-flash",
    description="Agent that helps plan Bengaluru commutes.",
    instruction=(
        "You are a Bengaluru commute planning assistant. "
        "When the user asks about travel between two locations, use get_route "
        "to fetch distance and duration. "
        "If the route passes through or near a known corridor "
        "(silk_board_orr, whitefield_stretch, hebbal, electronic_city) "
        "and the user gives a departure time, use check_bottleneck to assess "
        "congestion risk and suggest alternates if needed. "
        "Combine both tool outputs into a clear recommendation: "
        "adjusted ETA accounting for delay multiplier, and whether to consider "
        "an alternate route. "
        "Convert place names to approximate lat/lon coordinates yourself if the "
        "user gives place names instead of coordinates."
    ),
    tools=[get_route, check_bottleneck]
)