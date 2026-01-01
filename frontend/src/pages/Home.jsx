import React from 'react';

const features = [
  {
    icon: "📁",
    title: "Organized Documents",
    description: "Browse legal documents categorized for easy navigation, including PLD, CLD, Income Tax, and more.",
  },
  {
    icon: "🔍",
    title: "Powerful Search",
    description: "Find exactly what you need with our smart, real-time document search and filters.",
  },
  {
    icon: "👥",
    title: "User Access",
    description: "Login or signup to unlock profile-based features, save preferences, and manage your views.",
  },
  {
    icon: "📄",
    title: "Instant PDF Previews",
    description: "Preview documents on the fly without any downloads or third-party plugins.",
  },
];

const Home = () => {
  return (
    <>
    <div className="py-5"></div>
      <div className="container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 className="page-title" style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>🏠 Welcome to MM Lawsite</h1>

        <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: '2rem' }}>
          Your digital legal companion — search, view, and manage law documents with ease.
        </p>

        {/* Info Cards Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgb(148, 186, 211)',
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease-in-out',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ fontSize: '2rem' }}>{feature.icon}</div>
              <h3 style={{ marginTop: '0.8rem', fontSize: '1.25rem', color: '#222' }}>{feature.title}</h3>
              <p style={{ fontSize: '1rem', color: '#555', marginTop: '0.5rem' }}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA or Description Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#333' }}>📚 Start Exploring</h2>
          <p style={{ fontSize: '1.05rem', color: '#555' }}>
            Head over to the <strong>Documents</strong> tab to get started. Use filters, sort by date or title, and preview files directly.
          </p>
        </section>

        <section className="testimonials-section">
          <h2>📢 Testimonials</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>“MM Lawsite is a game-changer. Our tax filings have never been more organized.”</p>
              <strong>- Ali Khan, Khan & Co.</strong>
            </div>
            <div className="testimonial-card">
              <p>“The categorized structure saved me hours weekly. Highly recommended!”</p>
              <strong>- Advocate Sana Rafiq</strong>
            </div>
            <div className="testimonial-card">
              <p>“A must-have platform for every law firm dealing with complex tax docs.”</p>
              <strong>- LegalTech Review</strong>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: '3rem', fontSize: '0.95rem', color: '#888', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} MM Lawsite. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
