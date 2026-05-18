'use client';

import { PROFILE } from '@/lib/data';
import React from 'react';
import InterestIcon from './InterestIcon';
import { useResumeModal } from '@/context/ResumeModalContext';

const Hero: React.FC = () => {
  const { openResume } = useResumeModal();

  return (
  <div className="hero-myspace">
    <div className="hms-sidebar">
      <div className="hms-side-title">Personal Info</div>
      {PROFILE.sidebar.map((f) => (
        <div className="hms-side-field" key={f.label}>
          <div className="hms-side-label">{f.label}:</div>
          <div className="hms-side-val">
            {f.bullets?.length ? (
              <ul className="hms-side-bullets">
                {f.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : f.chips?.length ? (
              <div className="hms-side-chip-row">
                {f.lead ? (
                  <p className="hms-side-lead hms-side-lead-chip">
                    {f.lead}
                    <span className="hms-lead-at" aria-hidden="true">
                      {' @'}
                    </span>
                  </p>
                ) : null}
                <ul
                  className="hms-side-chips"
                  aria-label={
                    f.lead ? `${f.lead} @ ${f.chips.join(', ')}` : f.chips.join(', ')
                  }
                >
                  {f.chips.map((chip) => (
                    <li key={chip}>
                      <span className="hms-chip">{chip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                {f.lead ? <p className="hms-side-lead">{f.lead}</p> : null}
                {f.value ?? ""}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
    <div className="hms-content-col">
      <div className="hms-body">
        <p>{PROFILE.bioIntro}</p>
        <ul className="hms-obsessions">
          {PROFILE.obsessions.map((item) => (
            <li key={item.label}>
              <span className="hms-obsession-icon">
                <InterestIcon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <p>{PROFILE.bioOutro}</p>
      </div>
      <div className="hms-nav">
        <div className="hms-nav-trio" role="group" aria-label="Section navigation">
          <a href="#experience" className="hms-btn-trio">
            experience
          </a>
          <a href="#contact" className="hms-btn-trio">
            contact
          </a>
          <a href="#guestbook" className="hms-btn-trio" title="Friend comments">
            chat
          </a>
          <button type="button" className="hms-btn-trio" onClick={openResume}>
            resume
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Hero;
