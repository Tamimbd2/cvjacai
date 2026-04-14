import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Home from './components/Home/Home';
import Shortlisting from './components/Shortlisting/Shortlisting';
import Results from './components/Results/Results';
import Personalization from './components/Personalization/Personalization';
import AnalysisResults from './components/AnalysisResults/AnalysisResults';
import Auth from './components/Auth/Auth';

function App() {
  const [view, setView] = useState('home'); // 'home', 'shortlisting', 'results', 'personalization', 'analysis_results', or 'auth'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('cvjachai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const [analysisData, setAnalysisData] = useState(null);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data); // Store the full data object which includes access, refresh, and user
    localStorage.setItem('cvjachai_user', JSON.stringify(data));
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('cvjachai_user');
    setView('home');
  };

  const navigateToProtected = (targetView) => {
    if (isLoggedIn) {
      setView(targetView);
    } else {
      setAuthMode('login');
      setView('auth');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'analyzing':
        return (
          <div className="analyzing-screen" style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'var(--bg-color)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div className="processing-visual" style={{ marginBottom: '30px', position: 'relative' }}>
              <div className="pulse-ring"></div>
              <div className="pulse-ring" style={{ animationDelay: '0.5s' }}></div>
              <div className="pulse-ring" style={{ animationDelay: '1s' }}></div>
              <div className="ai-icon-large">
                <Sparkles size={60} color="var(--accent-cyan)" fill="var(--accent-cyan)" />
              </div>
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', letterSpacing: '-1px' }}>AI is analyzing resumes...</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '500px' }}>
              Our neural networks are scanning for the best matches based on your criteria. This usually takes a few seconds.
            </p>
            <div className="progress-bar-container" style={{ 
              width: '300px', 
              height: '4px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '2px', 
              marginTop: '40px',
              overflow: 'hidden'
            }}>
              <div className="progress-bar-fill"></div>
            </div>
          </div>
        );
      case 'shortlisting':
        return (
          <Shortlisting
            onBack={() => setView('home')}
            token={user?.access}
            onStartAnalysis={() => setView('analyzing')}
            onAnalyze={(result) => {
              setAnalysisData(result);
              setView('results');
            }}
          />
        );
      case 'results':
        return (
          <Results
            data={analysisData}
            onBackToForm={() => setView('shortlisting')}
            onBackToHome={() => setView('home')}
          />
        );
      case 'personalization':
        return (
          <Personalization
            onBack={() => setView('home')}
            onAnalyze={() => {
              setView('analyzing');
              // Simulate API delay for personalization demo
              setTimeout(() => setView('analysis_results'), 3000);
            }}
          />
        );
      case 'analysis_results':
        return (
          <AnalysisResults
            onBack={() => setView('personalization')}
            onBackToHome={() => setView('home')}
          />
        );
      case 'auth':
        return (
          <Auth
            mode={authMode}
            onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            onSuccess={handleLogin}
            onBack={() => setView('home')}
          />
        );
      default:
        return (
          <Home
            isLoggedIn={isLoggedIn}
            onStartShortlisting={() => navigateToProtected('shortlisting')}
            onStartPersonalization={() => navigateToProtected('personalization')}
            onLogin={() => { setAuthMode('login'); setView('auth'); }}
            onSignUp={() => { setAuthMode('signup'); setView('auth'); }}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {renderView()}
    </div>
  );
}

export default App;
