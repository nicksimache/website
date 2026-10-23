import { lavenderArticle, lavenderIntroduction, type ArticleBlock } from "./lavender-article";

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
  article?: ArticleBlock[];
}

export const projects: Project[] = [
  {
    id: "lavender",
    year: 2026,
    title: "Lavender",
    summary:
      "Vibe code complex Unity games froms scratch in an AI-assissted IDE",
    description: lavenderIntroduction,
    imageSrc: "/projects/lavender_thumbnail.png",
    imageAlt: "Lavender code workspace showing a C# project and AI assistant",
    technologies: ["C#", ".NET", "WPF", "AI"],
    article: lavenderArticle,
    details: [],
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
          "The project uses computer vision and AI to turn visual information from the environment into useful context for the wearer. The user can ask questions such as 'Whats in front of me?' 'Who just walked into the room?'",
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
      "Get Clone creates a digital clone of yourself in a video-call style interface. It speaks, looks, and thinks like you! The goal was to make the interaction feel less like prompting a generic chatbot and more like speaking with a personalized digital character.",
    imageSrc: "/projects/getclone_thumbnail.png",
    imageAlt: "Get Clone video call and AI conversation interface",
    videoSrc: "/projects/getclone_video.mp4",
    technologies: ["Generative AI", "React", "Python"],
    githubUrl: "https://github.com/pahu2353/get-clone",
    details: [
      {
        title: "How it works",
        paragraphs: [
          "Get Clone combines several Gen-AI APIs: first record a 30 second clip of your voice, write a few paragraphs about your interests and personality, and finally record a 5 second clip of your face standing as stil as possible.",
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
    id: "vertigis",
    year: 2026,
    title: "VertiGIS",
    summary: "QA engineering and Playwright automation for VertiGIS Studio Web.",
    description:
      "As a QA Engineer Co-op at VertiGIS, I worked on testing and automation for VertiGIS Studio Web, a platform for building interactive web mapping applications.",
    imageSrc: "/projects/vertigis-designer.png",
    imageAlt: "VertiGIS Studio Web Designer showing the Capital City map and services panel",
    technologies: ["Playwright", "QA", "Web GIS"],
    details: [
      {
        title: "Testing Studio Web",
        paragraphs: [
          "Worked with developers and QA team members to test product changes in VertiGIS Studio Web during my January to August 2026 co-op.",
        ],
      },
      {
        title: "Reliable test automation",
        paragraphs: [
          "Maintained Playwright automation, migrated more than 100 test suites, and improved their reliability and runtime.",
        ],
      },
    ],
  },
];
