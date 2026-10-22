export interface ProjectDetail {
  title: string;
  paragraphs: string[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  year?: number;
  description: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  details: ProjectDetail[];
}

export const projects: Project[] = [
  {
    id: "lavender",
    year: 2026,
    title: "Lavender",
    summary:
      "Vibe code complex Unity games froms scratch in an AI-assissted IDE",
    description:
      "Lavender is a desktop code-intelligence assistant for C# projects, with an initial focus on Unity and .NET codebases. It gives an AI assistant structural access to an entire project instead of relying on a few files pasted into a chat window.",
    imageSrc: "/projects/lavender_thumbnail.png",
    imageAlt: "Lavender code workspace showing a C# project and AI assistant",
    technologies: ["C#", ".NET", "WPF", "AI"],
    details: [
      {
        title: "A project-aware assistant",
        paragraphs: [
          "When a project is opened, Lavender analyzes its source with Roslyn, divides the code into searchable chunks, generates embeddings for semantic search, and builds indexes of symbols and dependencies. That project knowledge is exposed to an AI agent through a local MCP server.",
          "The aim is to answer practical questions with evidence from the codebase: where a feature is implemented, what calls a method, which files belong to a system, what currently fails to compile, and how several classes work together.",
        ],
      },
      {
        title: "The desktop application",
        paragraphs: [
          "Lavender is a Windows desktop application built with WPF and .NET 8. Its interface is organized like a simplified editor, with a project explorer, a syntax-highlighted C# source preview, and an assistant panel for questions about the open project.",
          "Folders load as they are expanded, common generated directories are ignored, and files can be dragged from the explorer into the assistant as explicit conversation context.",
        ],
      },
      {
        title: "Two ways to search code",
        paragraphs: [
          "Lavender combines two complementary indexing systems. Chunk-based vector search finds code by meaning, while a Roslyn semantic index handles precise structural questions about declarations, callers, callees, types, and compiler diagnostics.",
          "The vector-search pipeline breaks larger files into focused units such as methods, properties, constructors, and types. Metadata is embedded alongside the source and stored in LanceDB, allowing natural-language searches to find relevant code even when a query does not use the exact symbol name.",
        ],
      },
      {
        title: "Symbols, relationships, and project state",
        paragraphs: [
          "Roslyn gives Lavender a compiler-backed view of the project. Symbols receive stable identifiers, and relationships such as calls, inheritance, interface implementation, and type usage are stored as a graph. A separate dependency graph tracks projects, packages, assemblies, and target frameworks.",
          "The assistant can also inspect real compiler diagnostics and read-only Git information, including repository status and diffs. This lets it reason about both the structure of the code and its current working state.",
        ],
      },
      {
        title: "The MCP agent",
        paragraphs: [
          "A local MCP server gives the model focused tools for semantic search, symbol lookup, source retrieval, caller and callee queries, diagnostics, Git status, diffs, and file reading. The model retrieves evidence incrementally rather than receiving the entire repository in one enormous prompt.",
          "The agent loop is bounded by iteration, tool-call, timeout, and result-size limits. Conversations persist the messages, tool arguments, results, errors, and stop reasons, creating a detailed record of how an answer was produced.",
        ],
      },
      {
        title: "Where it is going",
        paragraphs: [
          "Lavender is still early. The strongest foundations are its semantic indexing and tool architecture; the next work is product integration—incremental indexing, richer code navigation, dependency and relationship tools, conversation history, and a smoother setup experience.",
        ],
      },
    ],
  },
  {
    id: "dungeon-crawler",
    title: "Multiplayer Dungeon Crawler",
    summary: "A networked Unity game focused on responsive combat and cooperative play.",
    description:
      "A multiplayer dungeon crawler built in Unity, focused on cooperative gameplay and responsive combat in a networked environment.",
    imageSrc: "/icons/temp.png",
    imageAlt: "Multiplayer dungeon crawler gameplay",
    videoSrc: "/icons/vid.mp4",
    technologies: ["Unity", "C#"],
    details: [
      {
        title: "Building the game",
        paragraphs: [
          "This project is an exploration of the systems that make a multiplayer game feel cohesive: synchronizing players, keeping combat responsive, and making the same encounter work for everyone connected to the session.",
        ],
      },
      {
        title: "Current direction",
        paragraphs: [
          "The project is still in development. Add more here about the dungeon loop, networking approach, enemy behavior, and the parts of the game you personally designed or implemented.",
        ],
      },
    ],
  },
  {
    id: "blindsight",
    year: 2025,
    title: "Blindsight",
    summary: "AI-assisted smart glasses that help visually impaired users understand their surroundings.",
    description:
      "Blindsight explores how smart glasses and AI can help visually impaired users understand and interact with their surroundings.",
    imageSrc: "/projects/blindsight_thumbnail.png",
    imageAlt: "Blindsight smart glasses on a dark background",
    technologies: ["Python", "Computer Vision", "AI"],
    githubUrl: "https://github.com/PABLO-HACKERS/blindsight",
    details: [
      {
        title: "The idea",
        paragraphs: [
          "The project uses computer vision and AI to turn visual information from the environment into useful context for the wearer. The focus is on assistance that feels immediate and practical rather than requiring the user to interpret a conventional screen.",
        ],
      },
      {
        title: "What to add next",
        paragraphs: [
          "Add more here about the prototype, how the vision pipeline worked, the hardware involved, and the part of the system you were responsible for.",
        ],
      },
    ],
  },
  {
    id: "get-clone",
    year: 2025,
    title: "Get Clone",
    summary: "A generative AI experiment for creating a personalized digital clone.",
    description:
      "Get Clone is a generative AI experiment that explores what it takes to create a digital version of a person that can speak and respond in a familiar way.",
    imageSrc: "/projects/getclone_thumbnail.png",
    imageAlt: "Get Clone video call and AI conversation interface",
    videoSrc: "/projects/getclone_video.mp4",
    technologies: ["Generative AI", "React", "Python"],
    githubUrl: "https://github.com/pahu2353/get-clone",
    details: [
      {
        title: "A conversational clone",
        paragraphs: [
          "The project brings several generative AI capabilities into a video-call-style interface. The goal is to make the interaction feel less like prompting a generic chatbot and more like speaking with a personalized digital character.",
        ],
      },
      {
        title: "The experiment",
        paragraphs: [
          "Get Clone was a chance to explore how different models can work together around identity, conversation, and presentation. Add more here about the model pipeline, training or personalization data, and the parts of the application you built.",
        ],
      },
    ],
  },
  {
    id: "neural-network",
    title: "Neural Network from Scratch",
    summary: "A handwritten-digit model built to understand the mechanics behind neural networks.",
    description:
      "A handwritten-digit classifier built from scratch in Python to understand the mathematics and mechanics behind neural-network training.",
    imageSrc: "/projects/neuralnetwork_thumbnail.png",
    imageAlt: "Hand-drawn diagram of a connected neural network",
    technologies: ["Python", "NumPy", "Machine Learning"],
    githubUrl: "https://github.com/nicksimache/neural-network",
    details: [
      {
        title: "Learning by implementing",
        paragraphs: [
          "Rather than starting with a high-level machine-learning framework, this project focuses on the underlying operations: moving data through the model, measuring error, and updating parameters during training.",
        ],
      },
      {
        title: "What it clarified",
        paragraphs: [
          "Building the model directly made concepts that can feel abstract—weights, activations, loss, and optimization—more concrete. Add the final architecture, dataset, and evaluation results here when ready.",
        ],
      },
    ],
  },
  {
    id: "study-buddies",
    year: 2024,
    title: "Study Buddies",
    summary: "A mobile study tool that generates personalized quizzes from course material.",
    description:
      "Study Buddies is a mobile study app that turns course material into personalized quizzes with a lightweight, game-inspired interface.",
    imageSrc: "/projects/studybuddies_thumbnail.png",
    imageAlt: "Study Buddies mobile quiz application screens",
    technologies: ["Mobile", "AI", "TypeScript"],
    githubUrl: "https://github.com/PABLO-HACKERS/studybuddies",
    details: [
      {
        title: "Personalized practice",
        paragraphs: [
          "Students can organize material by class and generate quizzes around what they want to review. The aim is to reduce the work involved in creating practice questions while keeping study sessions focused.",
        ],
      },
      {
        title: "Designed to feel approachable",
        paragraphs: [
          "The interface uses a playful visual style and simple difficulty choices to make repeated practice feel less formal. Add more here about quiz generation, the mobile stack, and your contribution to the project.",
        ],
      },
    ],
  },
];
