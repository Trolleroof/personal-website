import { PROFILE } from '@/lib/data';

const MoodStats: React.FC = () => (
  <div className="panel">
    <div className="panel-header"><span className="ph-icon">█</span> MOOD STATS</div>
    <div className="mood-grid">
      {PROFILE.mood.map((m) => (
        <div key={m.label}>
          <div className="mood-label">{m.label}</div>
          <div className="mood-bar-wrap"><div className="mood-bar" style={{ width: `${m.value}%` }}></div></div>
        </div>
      ))}
    </div>
  </div>
);

export default MoodStats;
