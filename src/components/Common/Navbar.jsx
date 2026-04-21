import React from 'react';
import { Sparkles } from 'lucide-react';

function Navbar({ isLoggedIn, onLogout, onLogin, onSignUp, onCreateJob, onJobManagement }) {
  return (
    <nav className="main-nav">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div className="logo" onClick={() => window.location.href = '/'}>
          <div className="logo-icon">
            <Sparkles size={18} color="white" fill="white" />
          </div>
          <span>CVJACHAI</span>
        </div>
        
        <div className="nav-auth-btns" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isLoggedIn ? (
            <>
              <button 
                onClick={onJobManagement} 
                className="btn-login" 
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer'
                }}
              >
                Job Management
              </button>
              <button 
                onClick={onCreateJob} 
                className="btn-login" 
                style={{ 
                  border: '1px solid var(--accent-cyan)', 
                  color: 'var(--accent-cyan)',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                Create Job
              </button>
              <button onClick={onLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); onLogin(); }} className="btn-login">Login</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onSignUp(); }} className="btn-signup">Sign Up</a>
            </>
          )}
        </div>
      </div>
      <style>{`
        .main-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 15, 28, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
