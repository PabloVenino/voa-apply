from dataclasses import dataclass, field
from agent_task import AgentTask
from pathlib import Path
from shared.factory.llm_provider import LlmProvider

@dataclass
class Agent:
    name: str
    goal: str
    backstory: str
    task: AgentTask
    llm: LlmProvider = field(default=None, repr=False)
    calls_dir: Path | None = field(default=None, repr=False)


    @property
    def _slug(self) -> str:
        return self.name.lower().replace(" ", "_").replace("ai_agent", "").strip("_")


    def _build_system_prompt(self) -> str:
        return (
            f"You are {self.name}. \n\n"
            f"## Your goal is: \n{self.goal} \n\n"
            f"## Your backstory is: \n {self.backstory}\n\n"
            f"## Current task: {self.task.name} \n"
            f"Task goal: {self.task.goal}"
            f"Task backstory: {self.task.backstory}"
            f"## Expected output format: \n{self.task.expected_output}"
        )
    

    def _call_llm(self, user_message: str) -> str:
        if self.llm is None:
            raise RuntimeError(f"Agent '{self.name}' has no LLM provider set. Please check the 'LLM' parameter if it is set.")
        
        system_prompt = self._build_system_prompt()
        response = self.llm.chat(system_prompt=system_prompt, user_message=user_message)

        self._save_call(system_prompt, user_message, response)
        return response
    

    def _save_call(self, system_prompt: str, user_message: str, response: str):
        if self.calls_dir is None:
            return
        
        slug = self.slug
        (self.calls_dir / f"{slug}_system_prompt.md").write_text(system_prompt, encoding="utf-8")
        (self.calls_dir / f"{slug}_user_message.md").write_text(user_message, encoding="utf-8")
        (self.calls_dir / f"{slug}_response.md").write_text(response, encoding="utf-8")
