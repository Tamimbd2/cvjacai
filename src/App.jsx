import React, { useState } from 'react';
import { 
  Zap, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Users, 
  ChevronRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Sparkles,
  Search,
  CheckCircle2,
  Globe,
  ArrowLeft,
  Upload,
  Trophy,
  Star,
  Download,
  FileText,
  Briefcase,
  Lightbulb,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

function App() {
  const [view, setView] = useState('home'); // 'home', 'shortlisting', 'results', 'personalization', or 'analysis_results'

  const renderView = () => {
    switch(view) {
      case 'home':
        return (
          <Home 
            onStartShortlisting={() => setView('shortlisting')} 
            onStartPersonalization={() => setView('personalization')}
          />
        );
      case 'shortlisting':
        return (
          <Shortlisting 
            onBack={() => setView('home')} 
            onAnalyze={() => setView('results')} 
          />
        );
      case 'results':
        return (
          <Results 
            onBackToForm={() => setView('shortlisting')} 
            onBackToHome={() => setView('home')} 
          />
        );
      case 'personalization':
        return (
          <Personalization 
            onBack={() => setView('home')} 
            onAnalyze={() => setView('analysis_results')}
          />
        );
      case 'analysis_results':
        return (
          <AnalysisResults 
            onBack={() => setView('personalization')} 
            onBackToHome={() => setView('home')}
          />
        );
      default:
        return (
          <Home 
            onStartShortlisting={() => setView('shortlisting')} 
            onStartPersonalization={() => setView('personalization')}
          />
        );
    }
  };

  return (
    <div className="app">
      {/* Glow Effects */}
      <div className="glow-purple" style={{ top: '10%', right: '-10%' }}></div>
      <div className="glow-cyan" style={{ top: '40%', left: '-10%' }}></div>
      
      <div className="container">
        {renderView()}
      </div>
    </div>
  );
}

function Home({ onStartShortlisting, onStartPersonalization }) {
  return (
    <>
      {/* Navbar */}
      <nav>
        <div className="logo" onClick={() => window.location.reload()}>
          <div className="logo-icon">
            <Sparkles size={18} color="white" fill="white" />
          </div>
          <span>CVJACHAI</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <a href="#" className="btn-get-started">Get Started</a>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="badge">
            <Zap className="badge-icon" />
            Powered by advanced AI
          </div>
          <h1>
            AI Resume <br />
            Analysis <br />
            <span className="gradient-text">Platform</span>
          </h1>
          <p className="hero-description">
            Transform your hiring process with intelligent resume screening. 
            Analyze candidates instantly with precision and accuracy powered by next-gen AI.
          </p>
          <div className="hero-btns">
            <button onClick={onStartShortlisting} className="btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
              Resume Shortlisting
              <ChevronRight size={18} />
            </button>
            <button onClick={onStartPersonalization} className="btn-secondary" style={{ cursor: 'pointer' }}>
              Resume Personalization
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>95%</h3>
              <p>Accuracy</p>
            </div>
            <div className="stat-item">
              <h3>10x</h3>
              <p>Faster</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Analyzed</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/Assets/Container.svg" alt="AI Resume Analysis Visualization" />
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-header">
          <div className="badge">
            <Target className="badge-icon" />
            Advanced Features
          </div>
          <h2 className="section-title">Next-Gen Hiring Intelligence</h2>
          <p className="section-subtitle">
            Powerful AI-driven features to revolutionize your recruitment.
          </p>
        </div>

        <div className="features-grid">
          <FeatureCard 
            icon={<Zap size={24} color="#f59e0b" />} 
            bg="#fef3c7"
            title="Instant Analysis" 
            description="AI-powered resume screening in seconds with deeper insights on qualifications."
          />
          <FeatureCard 
            icon={<Search size={24} color="#06b6d4" />} 
            bg="#ecfeff"
            title="Precision Matching" 
            description="Advanced algorithms match candidates to job requirements with accuracy."
          />
          <FeatureCard 
            icon={<BarChart3 size={24} color="#ec4899" />} 
            bg="#fdf2f8"
            title="Smart Analytics" 
            description="Comprehensive insights to make informed hiring decisions across your pipeline."
          />
          <FeatureCard 
            icon={<ShieldCheck size={24} color="#10b981" />} 
            bg="#ecfdf5"
            title="Bias Reduction" 
            description="Fair evaluation process focused on skills and qualifications alone."
          />
          <FeatureCard 
            icon={<Clock size={24} color="#ef4444" />} 
            bg="#fef2f2"
            title="Time Saving" 
            description="Reduce screening time by 90% while improving talent quality."
          />
          <FeatureCard 
            icon={<Users size={24} color="#8b5cf6" />} 
            bg="#f5f3ff"
            title="Team Collaboration" 
            description="Share insights and collaborate with your hiring team seamlessly."
          />
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="glow-purple" style={{ bottom: '0', left: '20%' }}></div>
        <div className="section-header">
          <h2 className="section-title">Trusted by Industry Leaders</h2>
          <p className="section-subtitle">Real metrics from real impact</p>
        </div>

        <div className="trust-grid">
          <TrustCard 
            icon={<Users size={20} />} 
            value="50,000+" 
            label="Resumes Analyzed" 
          />
          <TrustCard 
            icon={<Target size={20} />} 
            value="1,200+" 
            label="Companies" 
          />
          <TrustCard 
            icon={<CheckCircle2 size={20} />} 
            value="95%" 
            label="Accuracy Rate" 
          />
          <TrustCard 
            icon={<Globe size={20} />} 
            value="40+" 
            label="Countries" 
          />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-info">
            <div className="logo">
              <div className="logo-icon">
                <Sparkles size={18} color="white" fill="white" />
              </div>
              <span>CVJACHAI</span>
            </div>
            <p>AI-powered resume analysis platform for the future of hiring.</p>
            <div className="social-links">
              <a href="#" className="social-icon"><Twitter size={18} /></a>
              <a href="#" className="social-icon"><Linkedin size={18} /></a>
              <a href="#" className="social-icon"><Github size={18} /></a>
              <a href="#" className="social-icon"><Mail size={18} /></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CVJACHAI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function Shortlisting({ onBack, onAnalyze }) {
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

      <div className="form-container">
        <div className="form-group">
          <label>Job Description</label>
          <textarea className="form-control" placeholder="Enter the job description..."></textarea>
        </div>

        <div className="form-group">
          <label>Must-Have Skills</label>
          <input type="text" className="form-control" placeholder="Type a skill and press Enter..." />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience (Years)</label>
            <select className="form-control">
              <option>Select Experience...</option>
              <option>0-1 Years</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location (optional)</label>
            <input type="text" className="form-control" placeholder="Enter location..." />
          </div>
        </div>

        <div className="form-group">
          <label>Upload Resumes</label>
          <div className="upload-area">
            <div className="upload-icon">
              <Upload size={24} />
            </div>
            <p>Click to upload or drag and drop</p>
            <span>ZIP, DOC, PDF, or Images</span>
          </div>
        </div>

        <button onClick={onAnalyze} className="btn-submit">Analyze Resumes</button>
      </div>
    </div>
  );
}

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
  );
}

function Personalization({ onBack, onAnalyze }) {
  return (
    <div className="personalization-screen">
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
  );
}

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
  );
}

function FeatureCard({ icon, title, description, bg }) {
  return (
    <div className="feature-card">
      <div 
        className="feature-icon-wrapper" 
        style={{ backgroundColor: bg }}
      >
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function TrustCard({ icon, value, label }) {
  return (
    <div className="trust-card">
      <div className="icon-small">{icon}</div>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

export default App;
