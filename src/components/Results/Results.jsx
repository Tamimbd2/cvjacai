import React from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Download, Trophy, Star } from 'lucide-react';

function Results({ onBackToForm, onBackToHome }) {
  const candidates = [
    { name: "Sarah Johnson", email: "sarah.j@email.com", exp: "5 years experience", score: "95%", icon: <Trophy size={20} color="#f59e0b" />, iconBg: "#fef3c7", skills: "React, Python, AWS, Lead Generation" },
    { name: "Michael Chen", email: "m.chen@email.com", exp: "4 years experience", score: "92%", icon: <Trophy size={20} color="#94a3b8" />, iconBg: "#f1f5f9", skills: "Fullstack, Node.js, SQL, DevOps" },
    { name: "Emily Rodriguez", email: "emily.r@email.com", exp: "6 years experience", score: "88%", icon: <Trophy size={20} color="#b45309" />, iconBg: "#ffedd5", skills: "UI/UX, Figma, React, Typescript" },
    { name: "David Park", email: "d.park@email.com", exp: "3 years experience", score: "85%", icon: <Star size={20} color="#0ea5e9" />, iconBg: "#e0f2fe", skills: "Data Science, ML, Python, SQL" },
    { name: "Jessica Williams", email: "j.williams@email.com", exp: "4 years experience", score: "82%", icon: <Star size={20} color="#0ea5e9" />, iconBg: "#e0f2fe", skills: "Product Management, Agile, SaaS" },
  ];

  return (
    <div className="results-screen">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onBackToForm(); }} className="back-link">
            <ArrowLeft size={18} />
            Back to Form
          </a>
          <div className="logo" onClick={onBackToHome}>
            <div className="logo-icon">
              <Sparkles size={18} color="white" fill="white" />
            </div>
            <span>CVJACHAI</span>
          </div>
        </div>

        <div className="results-header">
          <div className="badge">
            <CheckCircle2 className="badge-icon" />
            Analysis Complete
          </div>
          <h1>Top 5 Candidates</h1>
          <p className="section-subtitle">Ranked by AI match score</p>
        </div>

        <div className="candidates-list">
          {candidates.map((c, i) => (
            <div key={i} className="candidate-card">
              <div className="candidate-pct">
                <div className="candidate-icon" style={{ backgroundColor: c.iconBg, margin: '0 auto 10px' }}>
                  {c.icon}
                </div>
                <span className="pct-value">{c.score}</span>
                <span className="pct-label">Match</span>
              </div>
              <div className="candidate-info">
                <h3>{c.name}</h3>
                <div className="candidate-meta">
                  <span>{c.email}</span>
                  <span>•</span>
                  <span>{c.exp}</span>
                </div>
                <div className="candidate-skills">
                  <strong>Skills Found: </strong> {c.skills}
                </div>
              </div>
              <button className="btn-download">
                <Download size={18} />
                Download PDF
              </button>
            </div>
          ))}
        </div>

        <div className="results-footer">
          <button className="btn-outline" onClick={onBackToForm}>New Analysis</button>
          <button className="btn-primary" onClick={onBackToHome} style={{ border: 'none', cursor: 'pointer' }}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default Results;
