import React from 'react';
import { ArrowLeft, Sparkles, FileText } from 'lucide-react';

function Personalization({ onBack, onAnalyze }) {
  return (
    <div className="personalization-screen">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="back-link">
            <ArrowLeft size={18} />
            Back to Home
          </a>
          <div className="logo" onClick={onBack}>
            <div className="logo-icon">
              <Sparkles size={18} color="white" fill="white" />
            </div>
            <span>CVJACHAI</span>
          </div>
        </div>

        <div className="form-header">
          <h1>Resume Personalization</h1>
          <p className="section-subtitle">Upload your CV to get AI-powered insights and recommendations</p>
        </div>

        <div className="form-container">
          <div className="upload-box">
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '15px' }}>Upload Your CV</label>
            <div className="file-preview">
              <div className="file-icon-circle">
                <FileText size={32} />
              </div>
              <span className="file-name">Mahabub Tamim- Flutter Developer_2.pdf</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="change-file">Click to change file</a>
            </div>
            <button onClick={onAnalyze} className="btn-submit" style={{ width: '100%', maxWidth: '300px' }}>Analyze My CV</button>
          </div>

          <div className="stats-row">
            <div className="mini-stat-card">
              <h3>95%</h3>
              <p>Accuracy Rate</p>
            </div>
            <div className="mini-stat-card">
              <h3>AI-Powered</h3>
              <p>Smart Analysis</p>
            </div>
            <div className="mini-stat-card">
              <h3>Instant</h3>
              <p>Real-time Results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalization;
