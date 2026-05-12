import { PROFILE } from '@/lib/data';
import React from 'react';

const Hero: React.FC = () => (
  <div className="hero-myspace">
    <div className="extended-network-bar">
      I&apos;m in your extended network
    </div>
    <div className="hms-inner">
      <div className="hms-sidebar">
        <div className="hms-side-title">Personal Info</div>
        {PROFILE.sidebar.map((f) => (
          <div className="hms-side-field" key={f.label}>
            <div className="hms-side-label">{f.label}:</div>
            <div className="hms-side-val">{f.value}</div>
          </div>
        ))}
      </div>
      <div className="hms-content-col">
        <div className="hms-body">
          {PROFILE.bio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <div className="hms-nav">
            <a href="#projects" className="hms-btn">Projects</a>
            <a href="#experience" className="hms-btn">Experience</a>
            <a href="#contact" className="hms-btn">Contact</a>
            <a href="#" className="hms-btn hms-btn-pink">Resume</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
