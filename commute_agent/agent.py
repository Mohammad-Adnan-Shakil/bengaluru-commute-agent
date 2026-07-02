from dotenv import load_dotenv
load_dotenv()

from google.adk.agents import Agent
from .sub_agents.route_agent import route_agent
from .sub_agents.advisor_agent import advisor_agent

root_agent = Agent(
    name="commute_agent",
    model="gemini-2.5-flash-lite",
    description="Orchestrates Bengaluru commute planning by delegating to specialized sub-agents.",
    instruction=(
        "You are the orchestrator for a Bengaluru commute planning system. "
        "For any commute query, first delegate to route_agent to gather route "
        "and congestion facts. "
        "If the user wants a recommendation, comparison between two departure times, "
        "or a final decision, delegate to advisor_agent, passing along the facts "
        "route_agent gathered. "
        "Always ensure the final response to the user is a clear, synthesized answer — "
        "not raw data dumps from either sub-agent. "
        "Remember the user's stated home/work locations within this session if they "
        "mention them, so follow-up queries don't require re-stating coordinates."
    ),
    sub_agents=[route_agent, advisor_agent]
)