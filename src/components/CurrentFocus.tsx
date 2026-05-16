import { PROFILE } from '@/lib/data';

const CurrentFocus: React.FC = () => {
  const { headline, detail, progressPct, footLeft, footRight } = PROFILE.currentFocus;
  const pct = Math.min(100, Math.max(0, progressPct));
  return (
    <div className="panel current-focus">
      <div className="panel-header">
        <span className="ph-icon">◈</span> Working on Currently
      </div>
      <div className="panel-body">
        <div className="cf-info">
          <div className="cf-headline">{headline}</div>
        </div>
        <div className="cf-detail">▸ {detail}</div>
        <div className="cf-bar" role="presentation">
          <div className="cf-progress" style={{ width: `${pct}%` }} />
        </div>
        <div className="cf-foot">
          <span>{footLeft}</span>
          {footRight ? <span>{footRight}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default CurrentFocus;
