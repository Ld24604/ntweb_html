
function SkillBar({ name, percentage, color }) {
  return (
    <div className="skill">
      <div className="skill-head">
        <span>{name}</span>
        <span className={`text-${color}`}>{percentage}%</span>
      </div>
      <div className="progress">
        <div className={`progress-bar bar-${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function Skills({ skills }) {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Kỹ năng</h2>
        <div className="skills-grid">
          {skills.map(skill => (
            <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} color={skill.color} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;