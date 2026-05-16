import { PROFILE } from '@/lib/data';
import InterestIcon from './InterestIcon';

const Interests: React.FC = () => (
  <div className="panel interests-section">
    <div className="panel-header"><span className="ph-icon">◇</span> Obsessions</div>
    <div className="panel-body interests-body">
      <div className="interests-grid">
        {PROFILE.interests.map((item) => (
          <div className="interest-cat" key={item.label}>
            <div className="interest-heading">
              <span className="interest-icon"><InterestIcon name={item.icon} /></span>
              <div className="interest-label">{item.label}</div>
            </div>
            <div className="interest-val">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Interests;
