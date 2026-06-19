# VOA APPLY -Your tailored CV Re-writer for a specific role.
## Use your own AI Model (set thru your configurations) and API KEY, so that you can easily tailor your own CV.

An Agentic AI system that helps candidates create tailored job application materials by orchestrating multiple AI agents while preserving factual accuracy.

Instead of simply rewriting a CV, the system analyzes both the candidate's CV and a target job description, then produces a customized application package that highlights the candidate's existing experience in the most relevant way - without inventing skills, experience, or achievements.

---

## Features

- Multi-agent architecture
- Shared skills/prompts across agents
- CV parsing and analysis
- Job description analysis
- Intelligent experience matching
- ATS-friendly CV generation
- Cover letter generation
- Interview question prediction
- Hallucination prevention through evidence-based rewriting

---

## How it Works

```text
             +----------------+
             | Candidate CV   |
             +----------------+
                      |
                      |
             +----------------+
             | Job Description|
             +----------------+
                      |
                      v
         +--------------------------+
         |      Orchestrator Agent  |
         +--------------------------+
                |       |           |
                |       |           |
                v       v           v
     CV Analyzer    JD Analyzer     Matching Agent
            \          |            /
             \         |           /
                +------------+
                | Evidence   |
                | Extraction |
                +------------+
                      |
                      v
             +------------------+
             | Resume Generator |
             +------------------+
                      |
                      +------------------+
                      |                  |
                      v                  v
             Cover Letter Agent   Interview Agent
                      |                  |
                      +---------+--------+
                                |
                                v
                      Final Candidate Package
```

---

## Workflow

1. Upload the candidate's CV.
2. Share the Job Description (link) / Text.
3. The orchestrator delegates tasks to specialized AI agents.
4. Agents analyze both documents independently.
5. Relevant experience is matched using factual evidence only.
6. The CV is rewritten to better align with the job requirements.
7. Additional application assets are generated.

---

## Output

For every job application, the system generates:

- Tailored CV
- Personalized Cover Letter
- Likely Technical Interview Questions
- Likely Behavioral Interview Questions

---

## Design Principles

### Truthfulness First

The system **never fabricates**:

- technologies
- years of experience
- projects
- certifications
- responsibilities

Instead, it reframes existing experience to maximize relevance.

---

### Evidence-Based Generation

Every statement included in the generated CV must be traceable to information found in:

- the uploaded CV
- user-provided context

No unsupported claims are introduced.

---

### Agent Specialization

Each AI agent has a single responsibility.

Example agents include:

- CV Analysis Agent
- Job Description Analysis Agent
- Experience Matching Agent
- Resume Writer Agent
- Cover Letter Agent
- Interview Preparation Agent

This modular architecture makes it easier to extend and improve individual components.

---

## Tech Stack

Current stack:

- Python
- FastAPI
- AI Agents
- Shared Skills
- Prompt Engineering

Planned additions:

- RAG
- Vector Database
- Memory
- Evaluation Pipeline
- React Frontend
- Authentication
- Docker deployment

---

## Repository Structure

```text
.
├── src/
│   ├── ai-engine/
│   │   ├── agents/
│   │   ├── shared/
│   │   └── orchestrator.py
│   │
│   ├── api/
│   │   └── app/
│   │       ├── models/
│   │       ├── repositories/
│   │       ├── routes/
│   │       ├── services/
│   │       ├── database.py
│   │       └── main.py
│   │
│   └── app/              # React frontend (planned)
│
├── docs/
└── README.md
```

---

## Future Improvements

- PDF export
- Multiple CV templates
- ATS scoring
- LinkedIn profile optimization
- Portfolio suggestions
- Skill gap analysis
- Multi-language support
- Company-specific interview preparation
- Recruiter feedback simulation

---

## Disclaimer

This project assists candidates in presenting their real experience more effectively.

It is **not** intended to generate misleading or false information. Users remain responsible for reviewing all generated content before submitting job applications.

---

## Contributing

Contributions are welcome.

If you have ideas for new agents, evaluation strategies, prompt improvements, or architectural enhancements, feel free to open an issue or submit a pull request.

---

## License

MIT License