# PROJECT_CONTEXT.md — Bengaluru Commute Agent

## What This Project Is
An agentic AI system built with Google ADK + Gemini that reasons about known Bengaluru traffic bottlenecks and gives synthesized commute recommendations. Instead of showing raw route data, it considers corridor-specific congestion patterns (Silk Board, Whitefield, Hebbal, Electronic City) and delivers a decisive recommendation. Built for the Google AI Agent Builder Series 2026 (Open Innovation track).

## Current Status
- [x] Multi-agent architecture works: orchestrator delegates to route_agent (data gathering) then advisor_agent (decision)
- [x] OpenRouteService API integration for live routing data
- [x] Curated bottleneck knowledge base for 4 major corridors
- [x] Departure time comparison tool
- [x] React + Vite frontend chat UI with FastAPI backend (port 8001)
- [x] 503 retry with graceful fallback for Gemini high-demand
- [ ] No persistent memory across sessions
- [ ] Congestion data is curated, not from live traffic feeds

## Architecture Overview
- Backend: Python, FastAPI, port 8001, Google ADK with Gemini 2.5 Flash-Lite
- Frontend: React 19, Vite 8, Tailwind CSS v4, port 5173
- Database: None (in-memory session service)
- ML/AI layer: Google ADK multi-agent (orchestrator + route_agent + advisor_agent)
- Deployment: Not deployed (local only via `adk web` or `uvicorn api:app`)

## Key Files & Entry Points
- `api.py` — FastAPI server, /chat endpoint, CORS for localhost:5173
- `commute_agent/agent.py` — Root orchestrator agent definition
- `commute_agent/sub_agents/route_agent.py` — Gathering sub-agent (ORS + bottleneck tools)
- `commute_agent/sub_agents/advisor_agent.py` — Decision sub-agent (departure time comparison)
- `commute_agent/tools/ors_tool.py` — OpenRouteService routing tool
- `commute_agent/tools/bottleneck_tool.py` — Curated corridor congestion checker
- `commute_agent/tools/monitor_tool.py` — Departure time comparison tool
- `commute_agent/data/bottlenecks.json` — Curated knowledge base for 4 corridors
- `frontend/src/App.jsx` — Single-page chat UI

## Environment & Setup
- `cd commute_agent && python -m venv venv && venv\Scripts\activate && pip install google-adk python-dotenv requests`
- `.env` needs `GOOGLE_API_KEY` and `ORS_API_KEY`
- Run backend: `uvicorn api:app --port 8001`
- Run frontend: `cd frontend && npm install && npm run dev`
- **Gotcha**: .env is inside commute_agent/ but .gitignore only has `commute_agent/.adk/` — so live API keys are committed

## Where I Left Off
- Last thing: Added React frontend UI (commit 5cf8853)
- Next: Add persistent memory across sessions, integrate live traffic APIs
- Known: Only 4 corridors covered, no live traffic feed integration

## Git & Deployment
- Remote: `https://github.com/Mohammad-Adnan-Shakil/bengaluru-commute-agent.git`
- Branch: main
- Last commit: "feat: add React frontend UI for commute agent"

## Context for AI Assistants
- Three-layer multi-agent separation: orchestrator delegates data-gathering then decision-making to separate sub-agents, each with a single clear responsibility
- Tools are standalone Python functions registered via `tools=[]` on the Agent, not ADK built-in tools
- Place names are converted to lat/lon inside route_agent instruction, not in a separate geocoding tool
- Bottleneck data is a static JSON file, not an API — easy to extend with more corridors
- Frontend uses `@tailwindcss/vite` plugin (Tailwind v4), not the PostCSS plugin approach
- .env secrets are committed to git — this is a security concern that should be fixed
