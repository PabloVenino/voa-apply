import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTIONS = [
  {
    q: "Tell me about a time you optimized a slow SQL query.",
    a: "Highlight profiling tools used, the bottleneck identified (e.g. missing index, N+1), the change made, and the measurable improvement.",
  },
  {
    q: "How would you design a high-throughput FastAPI service?",
    a: "Discuss async I/O, connection pooling, caching strategy, observability, and horizontal scaling behind a load balancer.",
  },
  {
    q: "Walk me through a CI/CD pipeline you've built or improved.",
    a: "Cover build, test, security scan, container build, registry push, and progressive rollout with rollback strategy.",
  },
  {
    q: "How do you ensure API contracts stay clean between teams?",
    a: "Mention OpenAPI specs, contract tests, semantic versioning, and a shared review process.",
  },
];

export function InterviewQuestions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {QUESTIONS.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left text-sm">{item.q}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
