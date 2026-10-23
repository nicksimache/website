const keyTerms = [
  "Claude-code-like", "game development in Unity", "AI agent", "C#", ".NET", "WPF",
  "FastAPI", "HTTP on localhost", "OpenAI’s APIs", "stored locally",
  "Model Context Protocol (MCP)", "Semantic search", "semantic search", "Roslyn",
  "compiler diagnostics", "LanceDB", "two-level spherical K-means", "NumPy",
  "cosine distance", "GPT-4", "GPT-6 Astra", "GPT-6 Luna", "medium reasoning",
  "procedural level generation", "inventory system", "request duration", "token usage",
  "per-prompt cache", "summaries", "batch editing tool", "Unity-specific tasks",
  "GameObjects", "local lightweight model", "Playwright", "computer vision",
];
const escapedTerms = keyTerms
  .sort((a, b) => b.length - a.length)
  .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const pattern = new RegExp(`(${escapedTerms.join("|")})`, "g");
const terms = new Set(keyTerms);

export function HighlightedText({ text }: { text: string }) {
  return <>{text.split(pattern).map((part, index) =>
    terms.has(part) ? <strong className="article-highlight" key={index}>{part}</strong> : part
  )}</>;
}
