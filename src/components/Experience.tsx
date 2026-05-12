import { PROFILE } from '@/lib/data';

const Experience: React.FC = () => (
  <div className="panel" id="experience">
    <div className="panel-header"><span className="ph-icon">■</span> Nikhil Prabhu's Schools &amp; Work</div>
    {PROFILE.experience.map((e) => (
      <div className="exp-item" key={e.role + e.place}>
        <div className="exp-role">{e.role}</div>
        <div className="exp-row">
          <div className="exp-place">{e.place}</div>
          <div className="exp-date">{e.date}</div>
        </div>
        <div className="exp-desc">{e.desc}</div>
      </div>
    ))}
  </div>
);

export default Experience;
