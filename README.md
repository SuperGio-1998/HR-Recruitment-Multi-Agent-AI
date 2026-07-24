# HR Recruitment Multi-Agent AI

An AI-powered recruitment assistant that automates candidate evaluation using multiple specialized AI agents.

## Overview

HR Recruitment Multi-Agent AI analyzes candidate resumes, matches skills against job requirements, generates interview questions, and provides hiring recommendations.

The system uses a multi-agent architecture powered by LLMs.

## Features

- Resume PDF upload and parsing
- Job requirement analysis
- Resume screening
- Skills matching
- AI-generated interview questions
- Automated hiring recommendation
- FastAPI backend API

## Architecture


Resume PDF
|
v
Resume Parser
|
v
HR Orchestrator
|
+----------------+
| 		|
v 		v
Resume Agent Job Agent

|
v

Skills Matching Agent

|
v

Interview Agent

|
v

Hiring Decision Agent


## Tech Stack

- Python
- FastAPI
- Ollama LLM
- Pydantic
- PDF Parser
- Multi-Agent Architecture

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health check |
| POST | `/upload-resume` | Upload and extract resume |
| POST | `/analyze-candidate` | Analyze candidate |
| POST | `/evaluate-resume` | Full AI evaluation pipeline |

## Current Status

Phase 2 completed:

- Backend API implemented
- Resume upload working
- Multi-agent evaluation pipeline working
- End-to-end candidate evaluation completed

## Future Improvements

- Database integration
- Candidate history dashboard
- Multiple candidate ranking
- HR web interface
- Authentication