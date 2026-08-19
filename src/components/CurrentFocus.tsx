import { PROFILE } from '@/lib/data';

const CurrentFocus: React.FC = () => {
  const { headline, detail, footRight } = PROFILE.currentFocus;
  return (
    <div className="panel current-focus">
      <div className="panel-header">
        Working on Currently
      </div>
      <div className="panel-body">
        <div className="cf-info">
          <div className="cf-headline">{headline}</div>
        </div>
        <div className="cf-detail">{detail}</div>
        {footRight ? (
          <div className="cf-foot">
            <span>{footRight}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CurrentFocus;
