export function TechnologyTags({ technologies }: { technologies: string[] }) {
  return (
    <div className="technology-tags" aria-label="Technologies used">
      {technologies.map((technology, index) => (
        <span className="technology-tag" key={`${technology}-${index}`}>
          {technology}
        </span>
      ))}
    </div>
  );
}
