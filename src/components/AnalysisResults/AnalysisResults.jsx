import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Briefcase,
  Lightbulb
} from 'lucide-react';

function AnalysisResults({ onBack, onBackToHome }) {
  const jobs = [
    { title: "Senior Frontend Developer", match: "92%" },
    { title: "Full Stack Engineer", match: "88%" },
    { title: "React Developer", match: "85%" },
  ];

  const improvements = [
    { title: "Add Quantifiable Achievements", priority: "HIGH", description: "Include specific metrics and results from your previous roles (e.g., 'Increased user engagement by 45%').", icon: <AlertCircle size={20} color="#EF4444" />, prioClass: "prio-high" },
    { title: "Highlight Technical Skills", priority: "HIGH", description: "Add more technical keywords related to modern frameworks and tools in your field.", icon: <AlertCircle size={20} color="#EF4444" />, prioClass: "prio-high" },
    { title: "Improve Summary Section", priority: "MEDIUM", description: "Create a compelling professional summary that highlights your unique value proposition.", icon: <TrendingUp size={20} color="#F59E0B" />, prioClass: "prio-med" },
    { title: "Add Certifications", priority: "MEDIUM", description: "Include relevant certifications to boost credibility (AWS, Azure, Google Cloud, etc.)", icon: <TrendingUp size={20} color="#F59E0B" />, prioClass: "prio-med" },
    { title: "Update Format", priority: "LOW", description: "Use a cleaner, more modern layout with better spacing and visual hierarchy.", icon: <CheckCircle2 size={20} color="#3B82F6" />, prioClass: "prio-low" },
  ];

  return (
    <div className="analysis-results-screen">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="back-link">
            <ArrowLeft size={18} />
            Back
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
          <h1>Your CV Analysis</h1>
          <p className="section-subtitle">AI-powered insights to improve your resume</p>
        </div>

        <div className="form-container">
          <div className="analysis-score-card">
            <div className="score-display">
              <span className="score-value">78%</span>
              <span className="score-label">CV Score</span>
            </div>
            <div className="score-info">
              <h2>Good CV, Room for Improvement</h2>
              <p>Your CV shows solid experience and skills, but there are several areas where you can enhance it to stand out more to recruiters and AI screening systems.</p>
              <div className="tag-row">
                <span className="status-tag tag-green">Well Structured</span>
                <span className="status-tag tag-yellow">Needs Keywords</span>
                <span className="status-tag tag-blue">ATS Compatible</span>
              </div>
            </div>
          </div>

          <div className="analysis-section">
            <div className="section-title-row">
              <div className="icon-box">
                <Briefcase size={20} />
              </div>
              Best Suited Jobs
            </div>
            <div className="job-list">
              {jobs.map((job, i) => (
                <div key={i} className="job-item">
                  <div className="job-rank">{i + 1}</div>
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <p>Based on your skills and experience</p>
                  </div>
                  <div className="job-match">{job.match}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-section">
            <div className="section-title-row">
              <div className="icon-box">
                <Lightbulb size={20} />
              </div>
              Recommended Improvements
            </div>
            <div className="improvement-list">
              {improvements.map((imp, i) => (
                <div key={i} className="improvement-item">
                  <div className="imp-icon">{imp.icon}</div>
                  <div className="imp-content">
                    <h4>
                      {imp.title}
                      <span className={`priority-badge ${imp.prioClass}`}>{imp.priority}</span>
                    </h4>
                    <p>{imp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="results-footer">
            <button className="btn-outline" onClick={onBack}>Analyze Another CV</button>
            <button className="btn-primary" onClick={onBackToHome} style={{ border: 'none', cursor: 'pointer' }}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;
