import Image from "next/image";

const technologies = [
  { name: "Python", icon: "/icons/python.svg" },
  { name: "C#", icon: "/icons/csharp.svg" },
  { name: "Java", icon: "/icons/java.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Unity", icon: "/icons/unity.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
];

export function Technologies() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">Technologies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="w-16 h-16 relative mb-2">
              <Image
                src={tech.icon || "/placeholder.svg"}
                alt={`${tech.name} icon`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-sm text-center">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
