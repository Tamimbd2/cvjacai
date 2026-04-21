import React, { useState, useEffect } from 'react';
import { Briefcase, Users, Trash2, Search, Plus, ChevronLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';

function JobManagement({ onBack, onPostJob, token }) {
  const [activeTab, setActiveTab] = useState('my_jobs'); // 'my_jobs', 'applicants', 'screening'
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screeningResults, setScreeningResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [topK, setTopK] = useState(3);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async (attempt = 1) => {
    const MAX_RETRIES = 10;
    const RETRY_DELAY_MS = 5000;
    try {
      if (attempt === 1) setLoading(true);
      setError(null);
      const response = await fetch("/api/jobs/my/", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) {
        if (response.status === 504 || response.status === 502 || response.status === 503) {
          throw new Error('SERVER_TIMEOUT');
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('NOT_JSON');
      }

      const data = await response.json();
      setJobs(Array.isArray(data) ? data : data.results || []);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching my jobs (attempt ${attempt}):`, err);
      if (attempt < MAX_RETRIES) {
        const isWakingUp = err.message === 'NOT_JSON' || err.message === 'SERVER_TIMEOUT';
        setError(isWakingUp
          ? `Server is waking up... retrying in ${RETRY_DELAY_MS / 1000}s (${attempt}/${MAX_RETRIES})`
          : `Connection failed. Retrying... (${attempt}/${MAX_RETRIES})`
        );
        setTimeout(() => fetchMyJobs(attempt + 1), RETRY_DELAY_MS);
      } else {
        setError("The server is taking too long to wake up. Please click 'Try Again' in a moment.");
        setLoading(false);
      }
    }
  };

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    
    try {
      const response = await fetch(`/api/jobs/${id}/delete/`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error('Failed to delete job');
      setShowDeleteSuccess(true);
      setJobs(jobs.filter(job => job.id !== id));
      setTimeout(() => setShowDeleteSuccess(false), 3000);
    } catch (err) {
      alert("Error deleting job: " + err.message);
    }
  };

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  const fetchApplicants = async (jobId) => {
    setLoadingApplicants(true);
    setSelectedJobId(jobId);
    setScreeningResults(null); // Clear previous screening results
    try {
      const response = await fetch(`/api/jobs/${jobId}/applications/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch applicants');
      const data = await response.json();
      setApplicants(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching applicants: " + err.message);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const runScreening = async (jobId) => {
    setIsAnalyzing(true);
    setScreeningResults(null);
    console.log(`Starting screening for job: ${jobId}, top_k: ${topK}`);
    
    // Check if we have applicants first
    if (applicants.length === 0) {
      setIsAnalyzing(true);
      try {
        const response = await fetch(`/api/jobs/${jobId}/applications/`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        const appList = Array.isArray(data) ? data : data.results || [];
        setApplicants(appList);
        if (appList.length === 0) {
          alert("This job has no applicants yet. You need at least one applicant to run AI screening.");
          setIsAnalyzing(false);
          return;
        }
      } catch (e) {
        console.error("Failed to pre-fetch applicants:", e);
      }
    }

    try {
      const formData = new FormData();
      formData.append("top_k", topK.toString());

      const response = await fetch(`/api/jobs/${jobId}/analyze/`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Screening API Error Details:', errorText);
        throw new Error(`The AI engine encountered an issue (Status ${response.status}). This often happens if the resumes are not yet indexed or the job description is too short.`);
      }

      const data = await response.json();
      console.log('Screening results received successfully');
      setScreeningResults(data.rankings || data);
    } catch (err) {
      console.error('Screening error:', err);
      alert("AI Screening Failed: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderScreeningTab = () => {
    if (selectedJobId) {
      const job = jobs.find(j => j.id === selectedJobId);
      return (
        <div>
          <button
            onClick={() => { setSelectedJobId(null); setScreeningResults(null); }}
            style={{ ...backButtonStyle, fontSize: '0.9rem', marginBottom: '20px' }}
          >
            <ChevronLeft size={16} /> Select Different Job
          </button>

          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>AI Screening: {job?.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Our AI will rank applicants based on their match with the job description.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ textAlign: 'right' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>Top Candidates</label>
                <select 
                  className="custom-select"
                  value={topK} 
                  onChange={(e) => setTopK(e.target.value)}
                >
                  <option value="1">Top 1</option>
                  <option value="3">Top 3</option>
                  <option value="5">Top 5</option>
                  <option value="10">Top 10</option>
                </select>
              </div>
              <button 
                onClick={() => runScreening(selectedJobId)}
                disabled={isAnalyzing}
                style={{
                  background: 'var(--accent-cyan)',
                  color: 'black',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  opacity: isAnalyzing ? 0.7 : 1
                }}
              >
                {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                {isAnalyzing ? 'Analyzing...' : 'Run AI Screening'}
              </button>
            </div>
          </div>

          {isAnalyzing ? (
            <div style={{ textAlign: 'center', padding: '100px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
              <div className="loader-orbit" style={{ width: '80px', height: '80px', margin: '0 auto 30px' }}></div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Analyzing Resumes</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Comparing applicant profiles with job requirements using advanced NLP...</p>
            </div>
          ) : screeningResults ? (
            <div style={{ display: 'grid', gap: '20px' }}>
              {screeningResults.length === 0 ? (
                <div key="no-results" style={{ textAlign: 'center', padding: '60px' }}>No candidates meet the criteria or no applicants found.</div>
              ) : (
                screeningResults.map((result, index) => (
                  <div key={`rank-${result.id || index}`} style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '30px',
                    borderRadius: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Rank Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      background: index === 0 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
                      color: index === 0 ? 'black' : 'white',
                      padding: '5px 15px',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      borderBottomRightRadius: '16px'
                    }}>
                      RANK #{index + 1}
                    </div>

                    <div style={{ marginTop: '10px' }}>
                      <h4 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{result.candidate_name || result.name}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.6)' }}>{result.candidate_email || result.email}</p>
                      
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <div style={{ background: 'rgba(0,255,242,0.05)', color: 'var(--accent-cyan)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                          Score: {Math.round((result.score || result.match_score || 0) * 100)}%
                        </div>
                        {result.experience && (
                          <div style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                            {result.experience} Years Exp.
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        border: '4px solid rgba(255,255,255,0.05)',
                        borderTopColor: 'var(--accent-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: '800'
                      }}>
                        {Math.round((result.score || result.match_score || 0) * 100)}
                      </div>
                      <a
                        href={result.resume_file || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px', textDecoration: 'none' }}
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <Search size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
              <h3>Ready for Screening</h3>
              <p style={{ maxWidth: '400px', margin: '0 auto' }}>Click the button above to start the AI-powered analysis of all applicants for this position.</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Select a job for AI Screening</h3>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{ ...backButtonStyle, fontSize: '0.9rem', marginBottom: 0 }}
          >
            Back to Dashboard
          </button>
        </div>
        {jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px' }}>No jobs found. Post a job first!</div>
        ) : (
          jobs.map(job => (
            <div
              key={`screen-job-${job.id}`}
              onClick={() => setSelectedJobId(job.id)}
              style={{ ...cardStyle, padding: '30px', flexDirection: 'row', justifyContent: 'space-between', gap: '0' }}
              onMouseEnter={(e) => applyHover(e, true)}
              onMouseLeave={(e) => applyHover(e, false)}
            >
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '5px' }}>{job.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>{job.location} • {job.company_name}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--accent-purple)' }}>Screen</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Applicants</div>
                </div>
                <ChevronLeft size={20} style={{ transform: 'rotate(180deg)', opacity: 0.5 }} />
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderApplicantsTab = () => {
    if (selectedJobId) {
      const job = jobs.find(j => j.id === selectedJobId);
      return (
        <div>
          <button
            onClick={() => { setSelectedJobId(null); setApplicants([]); }}
            style={{ ...backButtonStyle, fontSize: '0.9rem', marginBottom: '20px' }}
          >
            <ChevronLeft size={16} /> Back to Job List
          </button>

          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>Applicants for {job?.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Manage and screen candidates for this position.</p>
            </div>
            <button 
              onClick={() => {
                setActiveTab('screening');
                // setSelectedJobId remains the same
              }}
              className="btn-primary"
              style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Search size={18} /> Run AI Screening
            </button>
          </div>

          {loadingApplicants ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 className="animate-spin" size={40} /></div>
          ) : applicants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
              <Users size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
              <h3>No applications yet</h3>
              <p>Applications for this job will appear here.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {applicants.map(app => (
                <div key={`app-${app.id}`} style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '20px',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{app.candidate_name}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{app.candidate_email}</p>
                    <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                      Applied {new Date(app.applied_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={app.resume_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.9rem', borderRadius: '8px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Plus size={16} /> View Resume
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Select a job to view applicants</h3>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{ ...backButtonStyle, fontSize: '0.9rem', marginBottom: 0 }}
          >
            Back to Dashboard
          </button>
        </div>
        {jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px' }}>No jobs found. Post a job first!</div>
        ) : (
          jobs.map(job => (
            <div
              key={`app-job-${job.id}`}
              onClick={() => fetchApplicants(job.id)}
              style={{ ...cardStyle, padding: '30px', flexDirection: 'row', justifyContent: 'space-between', gap: '0' }}
              onMouseEnter={(e) => applyHover(e, true)}
              onMouseLeave={(e) => applyHover(e, false)}
            >
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '5px' }}>{job.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>{job.location} • {job.company_name}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--accent-cyan)' }}>View</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Candidates</div>
                </div>
                <ChevronLeft size={20} style={{ transform: 'rotate(180deg)', opacity: 0.5 }} />
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderMyJobsTab = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>My Job Listings</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Manage your active and closed job postings.</p>
          </div>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ ...backButtonStyle, fontSize: '0.9rem', marginBottom: 0 }}
          >
            Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 className="animate-spin" size={40} /></div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
            <Briefcase size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
            <h3>No jobs found</h3>
            <p>You haven't posted any jobs yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {jobs.map(job => (
              <div key={`myjob-${job.id}`} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                padding: '25px', 
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '5px' }}>{job.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>{job.location} • {job.company_name}</p>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '100px' }}>
                      {job.is_active ? 'Active' : 'Closed'}
                    </span>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '100px' }}>
                      {job.min_experience} Years Exp.
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => deleteJob(job.id)}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}
                    title="Delete Job"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleGlobalBack = () => {
    if (activeTab !== 'dashboard') {
      setActiveTab('dashboard');
      setSelectedJobId(null);
      setApplicants([]);
      setScreeningResults(null);
    } else {
      onBack();
    }
  };

  return (
    <div className="job-mgmt-container" style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'white', padding: '60px 20px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button onClick={handleGlobalBack} style={backButtonStyle}>
          <ChevronLeft size={24} /> Back {activeTab === 'dashboard' ? 'to Home' : 'to Dashboard'}
        </button>

        <div className="mgmt-header" style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '15px', lineHeight: '1' }}>
            Job <span className="gradient-text">Management</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.4rem' }}>Unified dashboard for all your recruitment needs.</p>
        </div>

        {activeTab === 'dashboard' ? (
          <div className="mgmt-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '20px', 
            perspective: '1000px'
          }}>
            {/* Create Job Card */}
            <div 
              onClick={onPostJob}
              className="mgmt-card"
              style={cardStyle}
              onMouseEnter={(e) => applyHover(e, true)}
              onMouseLeave={(e) => applyHover(e, false)}
            >
              <div style={{ ...iconWrapperStyle, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Plus size={48} strokeWidth={2.5} />
              </div>
              <h2 style={cardTitleStyle}>Create Job</h2>
              <p style={cardSubtitleStyle}>Post new openings.</p>
            </div>

            {/* My Jobs Card */}
            <div 
              className="mgmt-card"
              onClick={() => setActiveTab('my_jobs')}
              style={cardStyle}
              onMouseEnter={(e) => applyHover(e, true)}
              onMouseLeave={(e) => applyHover(e, false)}
            >
              <div style={{ ...iconWrapperStyle, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <Briefcase size={48} strokeWidth={2.5} />
              </div>
              <h2 style={cardTitleStyle}>My Jobs</h2>
              <p style={cardSubtitleStyle}>Manage your posts.</p>
            </div>

            {/* Applicants Card */}
            <div 
              className="mgmt-card"
              onClick={() => setActiveTab('applicants')}
              style={cardStyle}
              onMouseEnter={(e) => applyHover(e, true)}
              onMouseLeave={(e) => applyHover(e, false)}
            >
              <div style={{ ...iconWrapperStyle, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <Users size={48} strokeWidth={2.5} />
              </div>
              <h2 style={cardTitleStyle}>Applicants</h2>
              <p style={cardSubtitleStyle}>View applications.</p>
            </div>

            {/* Screening Card */}
            <div 
              className="mgmt-card"
              onClick={() => setActiveTab('screening')}
              style={cardStyle}
              onMouseEnter={(e) => applyHover(e, true)}
              onMouseLeave={(e) => applyHover(e, false)}
            >
              <div style={{ ...iconWrapperStyle, background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                <Search size={48} strokeWidth={2.5} />
              </div>
              <h2 style={cardTitleStyle}>Screening</h2>
              <p style={cardSubtitleStyle}>AI shortlisting.</p>
            </div>
          </div>
        ) : activeTab === 'my_jobs' ? renderMyJobsTab() : activeTab === 'screening' ? renderScreeningTab() : renderApplicantsTab()}
      </div>

      {/* Delete Success Dialog */}
      {showDeleteSuccess && (
        <div style={{
          position: 'fixed',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(16, 185, 129, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '16px 32px',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 2000,
          boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
          animation: 'slideDown 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards'
        }}>
          <CheckCircle size={24} color="white" />
          <span style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem' }}>Job deleted successfully!</span>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .mgmt-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .loader-orbit {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid var(--accent-cyan);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .custom-select {
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          outline: none;
          cursor: pointer;
          font-family: inherit;
        }
        .custom-select option {
          background: #1a1a1a;
          color: white;
          padding: 10px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const applyHover = (e, isEnter) => {
  const card = e.currentTarget;
  if (isEnter) {
    card.style.transform = 'translateY(-15px) scale(1.02)';
    card.style.background = 'rgba(255, 255, 255, 0.05)';
    card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5)';
  } else {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.background = 'rgba(255, 255, 255, 0.02)';
    card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    card.style.boxShadow = 'none';
  }
};

const backButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'none',
  border: 'none',
  color: 'var(--accent-cyan)',
  cursor: 'pointer',
  fontSize: '1.2rem',
  marginBottom: '40px',
  fontWeight: '600'
};

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '40px',
  padding: '60px 40px',
  cursor: 'pointer',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '25px',
  backdropFilter: 'blur(20px)'
};

const iconWrapperStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
  transition: 'all 0.3s'
};

const cardTitleStyle = {
  fontSize: '2.2rem',
  fontWeight: '800',
  margin: 0,
  letterSpacing: '-1px'
};

const cardSubtitleStyle = {
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.4)',
  margin: 0,
  lineHeight: '1.6'
};

export default JobManagement;
