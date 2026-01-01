// src/components/TeamSection.jsx
import React from 'react';

const team = [
  {
    name: 'M. Mubasher',
    role: 'Co-Founder & Legal Head',
    img: `${process.env.PUBLIC_URL}/boyavatar.png`,
    bio: 'Co-Founder of MM Lawsite and an experienced legal professional specializing in tax law and regulatory compliance. He leads the legal direction and ensures the platform maintains its professional integrity.',
  },
  {
    name: 'M. Nafeel',
    role: 'Co-Founder & Web Developer',
    img: `${process.env.PUBLIC_URL}/boyavatar.png`,
    bio: 'Co-Founder and Full-stack developer with a strong focus on frontend architecture, user interface design, and performance optimization. Responsible for building a seamless and intuitive user experience.',
  },
];

export default function TeamSection() {
  return (
    <section className="team-section">
      <div className="team-grid">
        {team.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.img} alt={member.name} className="team-photo" />
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p className="team-bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
