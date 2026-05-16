import { PROFILE } from '@/lib/data';

const ProfileQuote: React.FC = () => {
  const { text, attribution } = PROFILE.sidebarQuote;
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="ph-icon">❝</span> QUOTE
      </div>
      <div className="panel-body quote-panel-body">
        <blockquote className="sidebar-quote">
          <p>{text}</p>
          {attribution != null && attribution !== '' ? (
            <footer className="sidebar-quote-src">— {attribution}</footer>
          ) : null}
        </blockquote>
      </div>
    </div>
  );
};

export default ProfileQuote;
