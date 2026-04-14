import React, { useState } from 'react';
import { Users, Mail, ShieldCheck, Eye, EyeOff, FileText, Zap } from 'lucide-react';
import { authApi } from '../../api';

function Auth({ mode, onToggleMode, onSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let data;
      if (mode === 'login') {
        data = await authApi.signin(email, password);
      } else {
        data = await authApi.signup(name, email, password);
      }

      // Check if data is valid (api.js returns response.json())
      if (data && !data.error && !data.message?.toLowerCase().includes('failed')) {
        onSuccess(data);
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login Error Deep Dive:', {
        message: err.message,
        stack: err.stack,
        hint: 'If this works in Postman but not here, it is likely a CORS issue. The backend must allow your origin.'
      });
      setError(`Connection error: ${err.message}. Please check CORS settings on the backend.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-main">
        {/* Left Side: Form */}
        <div className="auth-left">
          <div className="auth-form-container">
            <div className="auth-brand" onClick={onBack} style={{ cursor: 'pointer' }}>
              <h1 className="logo-text">CVJACHAI</h1>
              <p>Welcome back to intelligent hiring</p>
            </div>

            <form className="auth-form-fields" onSubmit={handleSubmit}>
              {error && <div className="auth-error-message">{error}</div>}
              {mode === 'signup' && (
                <div className="form-group-modern">
                  <label>Full Name</label>
                  <div className="input-box">
                    <Users size={18} className="input-icon-left" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="form-group-modern">
                <label>Email Address</label>
                <div className="input-box">
                  <Mail size={18} className="input-icon-left" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group-modern">
                <label>Password</label>
                <div className="input-box">
                  <ShieldCheck size={18} className="input-icon-left" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" disabled={isLoading} />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
              </div>

              <button type="submit" className="btn-login-gradient" disabled={isLoading}>
                {isLoading ? (
                  <span className="loader-container">
                    <span className="loader"></span>
                    Processing...
                  </span>
                ) : (
                  mode === 'login' ? 'Login' : 'Sign Up'
                )}
              </button>
            </form>


            <div className="auth-switch">
              <span>{mode === 'login' ? "Don't have an account?" : "Already have an account?"}</span>
              <button onClick={onToggleMode}>{mode === 'login' ? 'Sign Up' : 'Login'}</button>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="auth-right">
          <div className="visual-wrapper">
            <div className="visual-card">
              <div className="card-header-cv">
                <div className="cv-icon"><FileText size={16} /></div>
                <div className="cv-details">
                  <span className="cv-label">CANDIDATE CV</span>
                  <span className="cv-name">Alex Rivers.pdf</span>
                </div>
              </div>
              <div className="cv-progress-bar">
                <div className="progress-fill"></div>
              </div>

              <div className="ai-chip-visual">
                <div className="chip-rect">
                  <span className="chip-text">AI</span>
                  <span className="chip-sub">INTERNVACE</span>
                </div>
                <div className="pulse-circle"></div>
              </div>

              <div className="match-score-card">
                <span className="match-label">MATCH SCORE</span>
                <span className="match-value">95%</span>
                <div className="match-badge">
                  <Zap size={10} fill="currentColor" />
                  EXCELLENT FIT
                </div>
              </div>

              <div className="skill-tags">
                <span className="tag">AI Engineering</span>
                <span className="tag">PyTorch</span>
              </div>
            </div>

            <div className="visual-text">
              <h2>Architecting the future of recruitment.</h2>
              <p>Leverage our deep neural networks to identify top 1% talent in seconds, not weeks.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="auth-footer-modern">
        <div className="footer-left-modern">
          <span className="footer-brand-name">CVJACHAI</span>
          <span className="copyright">© 2026 CVJACHAI. Architecting the future of recruitment.</span>
        </div>
        <div className="footer-right-modern">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
          <a href="#">Status</a>
        </div>
      </footer>
    </div>
  );
}

export default Auth;
