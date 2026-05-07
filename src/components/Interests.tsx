import { PROFILE } from '@/lib/data';

const Interests: React.FC = () => (
  <div className="panel">
    <div className="panel-header"><span className="ph-icon">✦</span> Nikhi Prabhu's Interests</div>
    <div className="interests-grid">
      {PROFILE.interests.map((item) => (
        <div className="interest-cat" key={item.label}>
          <div className="interest-label">{item.label}</div>
          <div className="interest-val">{item.value}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Interests;
