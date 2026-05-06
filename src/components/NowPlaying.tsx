import { PROFILE } from '@/lib/data';

const NowPlaying: React.FC = () => (
  <div className="panel now-playing">
    <div className="panel-header"><span className="ph-icon">♫</span> NOW PLAYING</div>
    <div className="panel-body">
      <div className="np-info"><div className="np-track">{PROFILE.nowPlaying.track}</div></div>
      <div className="np-artist">▶ {PROFILE.nowPlaying.current} / {PROFILE.nowPlaying.total} &nbsp;|&nbsp; 128kbps</div>
      <div className="np-bar"><div className="np-progress"></div></div>
      <div className="np-times"><span>{PROFILE.nowPlaying.current}</span><span>{PROFILE.nowPlaying.total}</span></div>
    </div>
  </div>
);

export default NowPlaying;
