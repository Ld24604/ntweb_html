
function ProjectCard({ project }) {
  const catLabel = { web: 'Web', mobile: 'Mobile', design: 'Design' };
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <div className="project-body">
        <span className={`badge badge-${project.badgeColor}`}>{catLabel[project.category]}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
}

export default ProjectCard;