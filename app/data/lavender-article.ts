export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "images"; images: { src: string; alt: string; width: number; height: number }[] };

export const lavenderIntroduction = "Lavender is meant to be a Claude-code-like vibe coding tool built specifically for game development in Unity. It combines an IDE with an AI agent that can navigate and make edits to a C# project.";

const beforeImages = `I was inspired to build a tool like this two years ago after garnering an interest in game development working on small personal Unity projects, where debugging with AI implied switching between Unity, Visual Studio, and ChatGPT. At the time I assumed most professional games studios shared the same workflow, so my goal was to bring the editor and assistant together.

Lavender is a desktop app in C# using .NET and WPF for the UI. A python FastAPI backend handles the embedding of project files and their semantic retrieval. Both run locally and communicate over HTTP on localhost. Model inference and embedding generation use OpenAI’s APIs but could very well use other models as well. The indexed vector database, embedding cache, and conversation histories are stored locally.

The agent interacts with the project through a Model Context Protocol (MCP) server. Where each MCP tool is implemented with a list of arguments and a description allowing the model to choose from and request operations: read a file, edit the file, search for code that has X functionality, look for Y symbol specifically.

The agent makes these decisions through a loop in which Lavender sends the current task, context, and available tools to the selected model, in which the model can request to use a tool in return. Results from previously executed tools are included in the next prompt in the loop.

One of the main challenges was thus to provide tools that give the model useful context on the project without needing to include the entire codebase in every request. Lavender accomplishes this in two ways:

Semantic search, in which Lavender identifies code based on a description in natural language
Roslyn (the C# compiler) provides useful APIs to build syntax trees for C# code, and provide info on symbols, source location, and compiler diagnostics.

These two systems allow Lavender to look for gameplay systems by functionality and by specific implementation.

Semantic search depends on the indexing of a C# project, where code and other files are divided into chunks. These chunks are sent to an embedding model to the backend in which the resulting vectors are stored in LanceDB. To retrieve chunks upon request, I implemented a two-level spherical K-means with NumPy. In which vectors are repeatedly re-assigned to groups based on similarity until assignments stabilize. Larger groups of chunks can be split into a second level. Once semantic search is called, the backend embeds the user query and compares it with the top level centroids (averages of the groups). It explores the two closest branches, eventually selecting the best candidate chunk in terms of cosine distance.

At this point Lavender was ready to test by asking it to create small games with different prompt complexity, model selections, and reasoning settings. The initial runs included simple games made with GPT-4 that cost approximately nothing and finished almost instantly. On the flip side, choosing the strongest model, GPT-6 Astra with maximum reasoning incurred around $2 in API cost and took around 15 minutes to finish the task.

The difference between the GPT-4 flappy bird style game, and the GPT-6 Astra dungeon crawler was very noticeable however:`;

const afterImages = `The game by Astra is fairly well done. I had only prompted it to create a simple dungeon crawler; not only did it do that, but it also decided to add multiple floors, procedural level generation, an inventory system, and a method of progression involving the upgrade of player and weapon attributes. Visually it does look like AI-slop, but I think if I had supplied the model with actual assets rather than letting it draw rectangles, the game would pass as a first demo.

These were individual development runs rather than benchmarked tests, however they did show that the more reasoning the model did the more API requests were made and the more context grew. I switched Lavender’s default model to GPT-6 Luna with medium reasoning.

I then wanted to collect performance data for each request that Lavender processes in both the app and backend. Requests are tagged by purpose and include the current agent iterations, embeddings and conversation summaries. The logs displayed request duration and token usage.

I identified that one factor that was causing unnecessary increase in the model’s context was repeated reads of the source code. To combat this a per-prompt cache contains things like file paths and visited line ranges. Before, If Lavender wants to view line 1-100 of a file, and later wants to view lines 80-120 of the same file, it keeps the previously seen 100 lines.

I also implemented a way to compress previous model context. When work includes multiple and long edits, chat context becomes large. At certain points, Lavender will replace old exchanges between its own reasoning and tool results with summaries of the overall outcome and progress towards a task.

One issue that I hadn’t expected is that Lavender would like to at this point change several lines in one file, think, change a couple lines in another file, think some more etc. This differs from what we see in the frontier coding tools that can write hundreds of lines of code in half of a second. I thus implemented a batch editing tool in which Lavender can apply edits for multiple files at once provided that the code doesn’t overlap.

Lavender can perform Unity-specific tasks though a project specific pipe installed in the Unity editor. Editor state is exposed to Lavender allowing it to view loaded scenes, GameObjects, attached components, transforms and references to each asset. Lavender can look at each of these objects and use tools to perform tasks such as creating a GameObject, adding a component to a GameObject/Asset or updating a transform.

Lavender is not finished and I will continue working on it in the near future. One issue it currently has (and I suspect that similar tools also face this issue) is that Lavender struggles to place assets in a scene in such a way to create cohesive and playable environments. Currently given a set of assets Lavender tends to place them in seemingly random locations at times. I will experiment with the training of a local lightweight model specializing in the creation of a game environment, or a more effective way to prompt the agent.`;

const sectionHeadings: [string, string][] = [
  ["I was inspired", "Why I built Lavender"],
  ["Lavender is a desktop app", "Architecture"],
  ["The agent interacts", "The agent and its tools"],
  ["One of the main challenges", "Finding useful project context"],
  ["Semantic search depends", "Indexing and semantic retrieval"],
  ["At this point", "Testing with generated games"],
  ["I then wanted", "Measuring performance"],
  ["I identified", "Managing context"],
  ["One issue that", "Batch editing"],
  ["Lavender can perform", "Working inside Unity"],
  ["Lavender is not finished", "What comes next"],
];

function paragraphs(text: string): ArticleBlock[] {
  return text.split(/\r?\n\r?\n/).flatMap((paragraph): ArticleBlock[] => {
    const heading = sectionHeadings.find(([prefix]) => paragraph.startsWith(prefix));
    const block: ArticleBlock = paragraph.startsWith("Semantic search,")
      ? { type: "list", items: paragraph.split(/\r?\n/) }
      : { type: "paragraph", text: paragraph };
    return heading ? [{ type: "heading", text: heading[1] }, block] : [block];
  });
}
export const lavenderArticle: ArticleBlock[] = [
  ...paragraphs(beforeImages),
  {
    type: "images",
    images: [
      { src: "/projects/emberdeep1.png", alt: "Emberdeep dungeon crawler screenshot 1", width: 1267, height: 782 },
      { src: "/projects/emberdeep2.png", alt: "Emberdeep dungeon crawler screenshot 2", width: 1185, height: 732 },
    ],
  },
  ...paragraphs(afterImages),
];
