# HR Recruitment Multi-Agent AI System

An AI-powered recruitment platform built using a multi-agent architecture, LangChain, Ollama LLM, FastAPI, React, and SQLite.

The system automates candidate evaluation by combining multiple specialized AI agents that analyze job requirements, screen resumes, match skills, generate interview questions, make hiring recommendations, and produce candidate intelligence insights.

---

# Project Overview

Traditional recruitment requires recruiters to manually review resumes, compare skills, prepare interview questions, and evaluate candidates.

This project uses an AI multi-agent workflow to assist HR teams by providing:

- Automated resume analysis
- Candidate skill evaluation
- Interview preparation
- AI hiring recommendations
- Candidate intelligence scoring
- Structured recruitment reports

---

# Technology Stack

## Backend

- Python
- FastAPI
- LangChain
- LangChain Ollama
- Ollama Local LLM
- Pydantic
- SQLAlchemy
- SQLite

## Frontend

- React
- Vite
- JavaScript

## AI Architecture

- Multi-Agent System
- Agent Orchestration
- Structured AI Output Validation
- Local LLM Inference

---

# System Architecture

   | 	    |      |       |		|
Job Agent Resume Agent Skills Agent Interview Agent

	|
Hiring Decision Agent
	|

Candidate Intelligence Agent
	|

AI HR Report


---

# Development Phases

# Phase 1 - Project Foundation

## Objective

Create the initial project structure and prepare the environment for AI recruitment development.

## Completed

- Created project repository
- Setup Python environment
- Installed required dependencies
- Created backend structure
- Prepared AI agent architecture

Project structure:

HR-Recruitment-Multi-Agent-AI

|
|-- agents
|-- backend
|-- config
|-- orchestrator
|-- schemas
|-- tools
|-- frontend


---

# Phase 2 - LLM Integration

## Objective

Connect the application with a local Large Language Model.

## Completed

Integrated:

- Ollama
- LangChain
- ChatOllama

Created:
config/
|
|-- llm.py


Purpose:

Centralized LLM configuration used by all AI agents.

---

# Phase 3 - Core Recruitment Agents

## Objective

Create specialized AI agents responsible for recruitment tasks.

## Implemented Agents

## Job Requirement Agent

Analyzes job descriptions and extracts:

- Required skills
- Experience requirements
- Qualifications


## Resume Screening Agent

Analyzes candidate resumes and extracts:

- Candidate information
- Experience
- Skills
- Education
- Certifications
- Projects


## Skills Matching Agent

Compares:

Job requirements

against

Candidate profile

Produces:

- Matching skills
- Missing skills
- Overall match percentage


## Interview Question Agent

Generates interview questions based on:

- Job requirements
- Candidate experience
- Skill gaps


## Hiring Decision Agent

Evaluates:

- Candidate profile
- Skills evaluation
- Interview assessment

Produces:

- Hiring recommendation
- Confidence score
- Strengths
- Concerns

---

# Phase 4 - Agent Orchestration

## Objective

Create a central workflow controller for all AI agents.

Implemented:
orchestrator/
|
|-- hr_orchestrator.py


Responsibilities:

- Execute agents in correct order
- Pass outputs between agents
- Validate responses
- Generate final HR package

Workflow:
Job Requirement
|
v
Resume Screening
|
v
Skills Matching
|
v
Interview Generation
|
v
Hiring Decision
|
v
Final HR Package


---

# Phase 5 - Backend API Development

## Objective

Expose the AI recruitment engine through REST API.

Implemented:

backend/

|
|-- main.py
|-- services
|-- database


## Features

### Resume Evaluation API

Endpoint:
POST /evaluate-resume

Function:

- Upload resume
- Extract resume text
- Execute AI pipeline
- Save evaluation result


### Candidate List API

Endpoint:
GET /candidates

Features:

- View candidates
- Filtering
- Sorting
- Pagination


### Candidate Detail API

Endpoint:
GET /candidate/{id}

Returns:

- Candidate information
- Evaluation result
- Hiring decision

---

# Phase 6 - Database Integration and Frontend Connection

## Objective

Store recruitment results and connect frontend interface.

## Database

Implemented:

SQLite database

Tables:

### Candidates

Stores:

- Candidate name
- Resume filename
- Created date


### Evaluations

Stores:

- Match percentage
- Hiring decision
- Confidence score
- AI recommendation


## Frontend

Implemented:

React application connected with FastAPI backend.

Features:

- Resume upload
- Candidate listing
- Evaluation display

---

# Phase 7 - Candidate Intelligence Layer

## Objective

Enhance the recruitment system by adding an AI intelligence layer that summarizes candidate quality beyond basic matching.

---

# New Component

## Candidate Intelligence Agent

Added:
agents/

candidate_intelligence_agent.py

Responsibilities:

- Analyze hiring decision output
- Generate candidate intelligence profile
- Calculate overall candidate score
- Summarize strengths
- Identify concerns
- Generate final recommendation

---

# New Schema Validation

Added:
schemas/

ai_intelligence_schema.py

Purpose:

Validate AI intelligence response using Pydantic models.

---

# Updated Orchestrator

Updated:
orchestrator/

hr_orchestrator.py

New workflow:
Job Requirement Agent
|
v
Resume Screening Agent
|
v
Skills Matching Agent
|
v
Interview Question Agent
|
v
Hiring Decision Agent
|
v
Candidate Intelligence Agent
|
v
Final AI HR Package

---

# Candidate Intelligence Output

Example:

```json
{
  "candidate_name": "John Doe",
  "decision": "Recommended",
  "confidence_score": 90,
  "score_breakdown": {
    "skills_score": 85,
    "experience_score": 90,
    "overall_score": 87
  },
  "strengths": [
    "Strong API Testing Background"
  ],
  "concerns": [
    "Limited Banking Experience"
  ],
  "recommendation": "Proceed to technical interview"
}

Current System Capability

The system can now:

Accept job requirements
Upload candidate resumes
Extract resume information
Analyze candidate skills
Generate interview questions
Provide hiring recommendations
Generate AI candidate intelligence
Save recruitment results
Display candidate evaluations
Testing Status

Completed End-to-End Testing:

Verified:

Backend startup
Frontend startup
Resume upload
AI agent execution
Database saving
Report generation
Candidate listing

Status:

Phase 7 Completed Successfully
Future Roadmap
Phase 8 - AI Intelligence Dashboard

Planned:

Candidate intelligence visualization
AI score cards
Strength and concern display
Improved candidate profile page
Better HR dashboard experience
Phase 9 - Advanced AI Features

Planned:

Interview answer evaluation
Candidate ranking
Multiple resume comparison
Recruitment analytics
Agent memory
RAG-based HR knowledge assistant
How To Run The Project
Backend

Activate environment:

venv\Scripts\activate

Initialize database:

python -m backend.database.init_db

Run API:

uvicorn backend.main:app --reload

Backend:

http://127.0.0.1:8000
Frontend

Navigate:

cd frontend

Install dependencies:

npm install

Run:

npm run dev

Frontend:

http://localhost:5173
Git Development History

Completed milestones:

Phase 1: Project Foundation
Phase 2: LLM Integration
Phase 3: Recruitment AI Agents
Phase 4: Agent Orchestration
Phase 5: Backend API
Phase 6: Database and Frontend Integration
Phase 7: Candidate Intelligence Layer
Author

SuperGio

HR Recruitment Multi-Agent AI System

Built with AI Agent Architecture and Local LLM Technology.


After paste:

```cmd
git status

Expected:

modified: README.md

Then:

git add README.md

git commit -m "Update README documentation from Phase 1 to Phase 7"

git push origin main