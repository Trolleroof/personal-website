import { PROFILE } from '@/lib/data';

const Skills: React.FC = () => (
  <div className="panel">
    <div className="panel-header"><span className="ph-icon">►</span> SKILLS &amp; STACK</div>
    <div className="panel-body">
      <div className="skills-grid">
        {PROFILE.skills.map((cat) => (
          <div key={cat.label}>
            <div className="skill-cat-label">{cat.label}</div>
            {cat.items.map((s) => (
              <span key={s.name} className={"skill-tag" + (s.hot ? " hot" : "")}>{s.name}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Skills;
