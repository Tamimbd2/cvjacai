import React, { useState } from 'react';
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

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
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
      case 'shortlisting':
        return (
          <Shortlisting
            onBack={() => setView('home')}
            onAnalyze={(formData) => {
              console.log('Analyzing with data:', formData);
              setView('results');
            }}
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
