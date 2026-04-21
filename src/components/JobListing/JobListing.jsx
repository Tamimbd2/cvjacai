import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';

const DUMMY_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechFlow Solutions',
    location: 'Remote / Dhaka',
    salary: '$80,000 - $120,000',
    type: 'Full-time',
    posted: '2 days ago',
    logo: 'TF',
    color: '#3b82f6',
    description: 'We are looking for a Senior Frontend Developer with expertise in React and modern CSS. You will be responsible for building high-quality web applications and mentoring junior developers.',
    requirements: ['5+ years of experience with React', 'Proficiency in CSS/Tailwind', 'Experience with state management', 'Strong problem-solving skills']
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    company: 'NeuralNext AI',
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    type: 'Full-time',
    posted: '5 hours ago',
    logo: 'NN',
    color: '#10b981',
    description: 'Join our cutting-edge AI team to develop and deploy large-scale machine learning models. You will work on natural language processing and computer vision projects.',
    requirements: ['Master or PhD in CS/AI', 'Python, PyTorch or TensorFlow', 'Experience with LLMs', 'Publications in top conferences']
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'CreativeEdge Lab',
    location: 'Berlin, Germany',
    salary: '€60,000 - €90,000',
    type: 'Contract',
    posted: '1 week ago',
    logo: 'CE',
    color: '#ec4899',
    description: 'Create beautiful and intuitive user experiences for our international clients. You will be involved in the entire design process from research to prototyping.',
    requirements: ['Portfolio showing UI/UX work', 'Figma proficient', 'Experience with design systems', 'User research knowledge']
  },
  {
    id: 4,
    title: 'Full Stack Engineer',
    company: 'Nexus Cloud',
    location: 'London, UK',
    salary: '£70,000 - £110,000',
    type: 'Full-time',
    posted: '3 days ago',
    logo: 'NC',
    color: '#8b5cf6',
    description: 'Help us scale our cloud infrastructure and build robust APIs. You will work across the stack from database optimization to frontend features.',
    requirements: ['Node.js and TypeScript', 'React experience', 'PostgreSQL and Redis', 'CI/CD and Docker']
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'ScaleUp Systems',
    location: 'Singapore',
    salary: '$100,000 - $150,000',
    type: 'Full-time',
    posted: '1 day ago',
    logo: 'SS',
    color: '#f59e0b',
    description: 'Define the product roadmap and work closely with engineering and design teams. You will bridge the gap between business goals and technical execution.',
    requirements: ['3+ years in Product Management', 'Agile/Scrum expertise', 'Data-driven decision making', 'Excellent communication']
  }
];

function JobListing({ onBack }) {
  const [expandedId, setExpandedId] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApplyClick = (e, job) => {
    e.stopPropagation();
    setApplyingJob(job);
    setIsSubmitted(false);
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Submitting application for:', applyingJob.title);
    console.log('Data:', formData, 'File:', file?.name);
    
    setIsSubmitted(true);
    setTimeout(() => {
      setApplyingJob(null);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
      setFile(null);
    }, 3000);
  };

  return (
    <div className="job-listing-container" style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-color)', 
      color: 'white',
      padding: '40px 20px'
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button 
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--accent-cyan)',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '30px',
            padding: '10px 0',
            fontWeight: '500'
          }}
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <div className="header" style={{ marginBottom: '50px' }}>
          <div className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>
            <Sparkles size={14} />
            Available Positions
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '801', marginBottom: '15px', letterSpacing: '-1px' }}>
            Find Your Dream <span className="gradient-text">Job</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.2rem', maxWidth: '600px' }}>
            Explore opportunities that match your skills. Our AI-driven platform connects top talent with innovative companies.
          </p>
        </div>

        <div className="jobs-list" style={{ display: 'grid', gap: '20px' }}>
          {DUMMY_JOBS.map((job) => {
            const isExpanded = expandedId === job.id;
            return (
              <div 
                key={job.id} 
                className={`job-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleExpand(job.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isExpanded ? 'rgba(34, 211, 238, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: '20px',
                  padding: '28px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '16px', 
                      background: `linear-gradient(135deg, ${job.color} 0%, rgba(0,0,0,0.3) 100%)`, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      fontSize: '1.6rem',
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: `0 8px 16px ${job.color}33`
                    }}>
                      {job.logo}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: '700', color: '#fff' }}>{job.title}</h3>
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                          <Briefcase size={16} color="var(--accent-cyan)" />
                          {job.company}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                          <MapPin size={16} color="var(--accent-cyan)" />
                          {job.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                          <DollarSign size={16} color="var(--accent-cyan)" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.85rem', background: 'rgba(255, 255, 255, 0.08)', padding: '6px 14px', borderRadius: '8px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>
                        {job.type}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                        <Clock size={14} />
                        {job.posted}
                      </div>
                    </div>
                    {!isExpanded && (
                      <button 
                        className="btn-primary" 
                        style={{ border: 'none', cursor: 'pointer', padding: '12px 28px', fontSize: '1rem', borderRadius: '10px' }}
                        onClick={(e) => handleApplyClick(e, job)}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="job-details" style={{ 
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
                    paddingTop: '24px',
                    animation: 'slideDown 0.4s ease-out'
                  }}>
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '12px', fontSize: '1.2rem' }}>About the Role</h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                        {job.description}
                      </p>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                      <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '12px', fontSize: '1.2rem' }}>Requirements</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                        {job.requirements.map((req, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.7)' }}>
                            <CheckCircle2 size={16} color="var(--accent-cyan)" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ border: 'none', cursor: 'pointer', padding: '14px 40px', fontSize: '1.1rem', borderRadius: '10px' }}
                        onClick={(e) => handleApplyClick(e, job)}
                      >
                        Apply for this position
                      </button>
                      <button 
                        className="btn-secondary" 
                        style={{ border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', padding: '14px 20px', fontSize: '1.1rem', borderRadius: '10px', background: 'transparent' }}
                        onClick={(e) => { e.stopPropagation(); toggleExpand(job.id); }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Modal */}
      {applyingJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '550px',
            padding: '40px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            animation: 'modalEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <button 
              onClick={() => setApplyingJob(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: 'white',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px'
              }}
            >
              ×
            </button>

            {!isSubmitted ? (
              <>
                <div style={{ marginBottom: '30px' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>Apply for Position</h2>
                  <p style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>{applyingJob.title}</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>at {applyingJob.company}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                       onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                       onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>Upload CV / Resume</label>
                    <div 
                      style={{
                        border: '2px dashed rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '30px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        background: file ? 'rgba(34, 211, 238, 0.05)' : 'transparent',
                        borderColor: file ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.1)'
                      }}
                      onClick={() => document.getElementById('cv-upload').click()}
                    >
                      <input 
                        id="cv-upload" 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        style={{ display: 'none' }} 
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <div style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                        <Sparkles size={24} style={{ margin: '0 auto 10px', display: 'block' }} />
                      </div>
                      <p style={{ fontSize: '0.95rem', marginBottom: '4px' }}>
                        {file ? file.name : 'Click to upload your CV'}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ 
                      marginTop: '10px',
                      justifyContent: 'center',
                      padding: '16px',
                      fontSize: '1.1rem'
                    }}
                  >
                    Submit Application
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'rgba(34, 211, 238, 0.1)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  margin: '0 auto 24px',
                  color: 'var(--accent-cyan)'
                }}>
                  <CheckCircle2 size={48} />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '16px' }}>Application Sent!</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.6' }}>
                  Your application for <strong style={{ color: 'white' }}>{applyingJob.title}</strong> has been successfully submitted. We'll be in touch soon.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalEntrance {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default JobListing;
