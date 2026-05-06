import { PROFILE } from '@/lib/data';
import React from 'react';

const Hero: React.FC = () => (
  <div className="hero-myspace">
    <div className="hms-sidebar">
      <div className="hms-side-actions">
        <a href="#" className="hms-side-link">Report Abuse</a>
        <a href="#" className="hms-side-link">Block Member</a>
      </div>
      <div className="hms-side-title">Personal Info</div>
      {PROFILE.sidebar.map((f) => (
        <div className="hms-side-field" key={f.label}>
          <div className="hms-side-label">{f.label}</div>
          <div className="hms-side-val">{f.value}</div>
        </div>
      ))}
    </div>
    <div className="hms-content-col">
      <div className="hms-body">
        <p className="hms-music">ALL MUSIC PROVIDED BY <span className="msa-blink">█</span></p>
        <br/>
        {PROFILE.bio.map((line, i) => (
          <React.Fragment key={i}>
            <p>{line.split("@GITHUB@").map((seg, j, arr) =>
              j < arr.length - 1
                ? <React.Fragment key={j}>{seg}<span className="msa-red">{PROFILE.github}</span></React.Fragment>
                : <React.Fragment key={j}>{seg.split("\n").map((l, k) => <React.Fragment key={k}>{k > 0 && <br/>}{l}</React.Fragment>)}</React.Fragment>
            )}</p>
            <br/>
          </React.Fragment>
        ))}
        <div className="hms-nav">
          <a href="#projects" className="hms-btn">► PROJECTS</a>
          <a href="#experience" className="hms-btn">EXPERIENCE</a>
          <a href="#contact" className="hms-btn">CONTACT</a>
          <a href="#" className="hms-btn hms-btn-red">RESUME ↗</a>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
