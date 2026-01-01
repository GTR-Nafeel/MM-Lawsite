import React from 'react';
import TeamSection from '../components/TeamSection';
import '../styles/about.css'; // (make sure it's imported)

export default function About() {
  return (
    
    <div className="about-page">
      <div className="about-card">
        <img src="/mm-logo.png" alt="MM Lawsite Logo" className="about-logo" />

        <p className="about-intro">
          <strong>MM Lawsite</strong> is a forward-thinking legal technology initiative committed to transforming how legal professionals interact with documentation. We aim to bridge the gap between tradition and innovation — offering tools that streamline case preparation, document management, and resource access.
        </p>

        <div className="about-info-container">
          <div className="about-info-card">
            <h2>Our Mission</h2>
            <p>
              To empower legal practitioners with efficient, intuitive, and secure tools for managing and accessing legal
              documents. We believe technology should elevate — not replace — the expertise of legal professionals.
            </p>
          </div>

          <div className="about-info-card">
            <h2>Core Values</h2>
            <ul>
              <li>Integrity in every line of code and clause of law</li>
              <li>Organized and accessible legal resources</li>
              <li>Fast, reliable, and intuitive user experience</li>
              <li>Strong commitment to privacy and data security</li>
              <li>Continuous innovation rooted in legal tradition</li>
            </ul>
          </div>
        </div>

        <section className="about-team-section">
          <h2 className="center">Meet Our Team</h2>
          <TeamSection />
        </section>

        <section className="about-quote">
          “The law is reason, free from passion — but we bring both.”
        </section>

        <footer className="about-footer">
          &copy; {new Date().getFullYear()} MM Lawsite. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
