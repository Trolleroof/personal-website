import { PROFILE } from '@/lib/data';

const Experience: React.FC = () => (
  <div className="panel" id="experience">
    <div className="panel-header">Work Experience</div>
    {PROFILE.experience.map((e) => (
      <div className="exp-item" key={e.role + e.place}>
        <div className="exp-logo" aria-hidden="true">
          <img src={e.logo.src} alt="" />
        </div>
        <div className="exp-main">
          <div className="exp-row">
            <div className="exp-place">{e.place}</div>
            <div className="exp-location">{e.organization}</div>
          </div>
          <div className="exp-row exp-row--sub">
            <div className="exp-role">{e.role}</div>
            <div className="exp-date">{e.date}</div>
          </div>
          <div className="exp-desc">{e.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

export default Experience;
