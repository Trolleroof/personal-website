import { PROFILE } from '@/lib/data';

const Publications: React.FC = () => {
  if (!PROFILE.publications || PROFILE.publications.length === 0) {
    return null;
  }

  return (
    <div className="panel" id="publications">
      <div className="panel-header">Publications</div>
      <div className="pub-list">
        {PROFILE.publications.map((pub, idx) => (
          <article key={idx} className="pub-item">
            <div className="pub-header">
              <h3 className="pub-title">
                <a href={pub.url} target="_blank" rel="noopener noreferrer">       
                  {pub.title}
                </a>
              </h3>
            </div>
            <div className="pub-meta">
              <span className="pub-conference">{pub.conference}</span>
              <span className="pub-date">•</span>
              <span className="pub-date">{pub.date}</span>
            </div>
            <div className="pub-description-wrap">
              <p className="pub-description">{pub.description}</p>
              <span className="pub-description-hint">Hover · full abstract</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Publications;
