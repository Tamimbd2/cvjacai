import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Upload } from 'lucide-react';

function Shortlisting({ onBack, onAnalyze }) {
  const [formData, setFormData] = useState({
    job_circular: '',
    skills: '',
    min_experience: '',
    top_k: '5',
    resume_files: null
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setFormData(prev => ({ ...prev, resume_files: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resume_files) {
      alert("Please upload at least one resume file.");
      return;
    }
    onAnalyze(formData);
  };

  return (
    <div className="shortlisting-screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="back-link">
          <ArrowLeft size={18} />
          Back to Home
        </a>
        <div className="logo" onClick={() => window.location.reload()}>
          <div className="logo-icon">
            <Sparkles size={18} color="white" fill="white" />
          </div>
          <span>CVJACHAI</span>
        </div>
      </div>

      <div className="form-header">
        <h1>Resume Shortlisting</h1>
        <p className="section-subtitle">Fill in the details to find the perfect candidates</p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Circular (Description)</label>
          <textarea 
            name="job_circular"
            className="form-control" 
            placeholder="Tell us about the job..."
            required
            value={formData.job_circular}
            onChange={handleInput}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Must-Have Skills</label>
          <input 
            type="text" 
            name="skills"
            className="form-control" 
            placeholder="e.g. React, Node.js, Python (comma separated)" 
            required
            value={formData.skills}
            onChange={handleInput}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Minimum Experience (Years)</label>
            <input 
              type="number" 
              name="min_experience"
              className="form-control" 
              placeholder="e.g. 2" 
              min="0"
              required
              value={formData.min_experience}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label>Top Candidates to Scan (Top K)</label>
            <input 
              type="number" 
              name="top_k"
              className="form-control" 
              placeholder="e.g. 5" 
              min="1"
              required
              value={formData.top_k}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Upload Resumes</label>
          <input 
            type="file" 
            id="resume-upload" 
            style={{ display: 'none' }} 
            onChange={handleFile}
            accept=".zip,.pdf,.docx"
          />
          <div 
            className="upload-area" 
            onClick={() => document.getElementById('resume-upload').click()}
            style={{ border: formData.resume_files ? '2px solid var(--accent-cyan)' : '' }}
          >
            <div className="upload-icon">
              <Upload size={24} />
            </div>
            <p>{formData.resume_files ? formData.resume_files.name : 'Click to upload or drag and drop'}</p>
            <span>ZIP, PDF, or DOCX files</span>
          </div>
        </div>

        <button type="submit" className="btn-submit">Analyze Resumes</button>
      </form>
    </div>
  );
}

export default Shortlisting;
