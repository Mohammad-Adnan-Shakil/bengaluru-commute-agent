# agent.py
from dotenv import load_dotenv
load_dotenv()

from google.adk.agents import Agent
from .tools.ors_tool import get_route   # ← relative import, note the leading dot

root_agent = Agent(
    name="commute_agent",
    model="gemini-2.5-flash", 
    description="Agent that helps plan Bengaluru commutes.",
    instruction=(
        "You are a Bengaluru commute planning assistant. "
        "When the user asks about travel between two locations, "
        "use the get_route tool to fetch distance and duration. "
        "Convert place names to approximate lat/lon coordinates yourself "
        "before calling the tool if the user gives place names instead of coordinates."
    ),
    tools=[get_route]
)