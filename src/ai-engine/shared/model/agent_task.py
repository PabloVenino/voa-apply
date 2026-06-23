from dataclasses import dataclass


@dataclass
class AgentTask:
    name: str
    goal: str
    backstory: str
    expected_output: str