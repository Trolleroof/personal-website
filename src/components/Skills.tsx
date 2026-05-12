import { PROFILE } from '@/lib/data';

const Skills: React.FC = () => (
  <div className="panel">
    <div className="panel-header"><span className="ph-icon">★</span> My Friend Space</div>
    <div className="panel-body">
      <p style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
        I have <strong>{PROFILE.skills.reduce((a, c) => a + c.items.length, 0)} friends</strong> in my tech stack.
      </p>
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
