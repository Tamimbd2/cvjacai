import React from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, 
  Sparkles, 
  Printer, 
  FileText, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

function AnalysisResults({ onBack, onBackToHome, data }) {
  // Fallback to demo data if nothing from API
  const resumeMarkdown = data?.optimized_resume_markdown || "";
  const engine = data?.optimization_engine || "AI Core";
  const disclaimer = data?.disclaimer || "Please review for accuracy.";

  const handlePrint = () => {
    window.print();
  };

  const handleExport = (format) => {
    alert(`Exporting as ${format}... This feature will be available in the next update. Using "Print to PDF" for now is recommended.`);
  };

  return (
    <div className="analysis-results-screen">
      <style>{`
        @media print {
          .analysis-results-screen .container > :not(.resume-paper-container),
          .analysis-results-screen .results-footer,
          .analysis-results-screen .back-link,
          .analysis-results-screen .logo,
          .export-actions {
            display: none !important;
          }
          .analysis-results-screen {
            padding: 0 !important;
            background: white !important;
          }
          .resume-paper {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="back-link">
            <ArrowLeft size={18} />
            Back to Editor
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
            Optimization Ready
          </div>
          <h1>Optimized ATS Resume</h1>
          <p className="section-subtitle">Tailored by {engine} for maximum impact</p>
        </div>

        <div className="export-actions" style={{ 
          display: 'flex', 
          gap: '15px', 
          marginBottom: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button className="btn-action" onClick={handlePrint}>
            <Printer size={18} />
            Print to PDF
          </button>
          <button className="btn-action" onClick={() => handleExport('DOCX')}>
            <FileText size={18} />
            Download DOCX
          </button>
          <button className="btn-action" onClick={() => handleExport('PNG')}>
            <ImageIcon size={18} />
            Export PNG
          </button>
        </div>

        <div className="resume-paper-container" style={{ paddingBottom: '60px' }}>
          <div className="resume-paper" style={{
            background: '#ffffff',
            color: '#1a202c',
            padding: '60px 70px',
            borderRadius: '2px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 20px 60px -15px rgba(0,0,0,0.4)',
            width: '100%',
            maxWidth: '860px',
            margin: '0 auto',
            textAlign: 'left',
            lineHeight: '1.6',
            fontFamily: "'Georgia', serif",
            borderTop: '5px solid #1e40af',
            position: 'relative'
          }}>
            <div className="markdown-content">
              <ReactMarkdown>{resumeMarkdown}</ReactMarkdown>
            </div>
            
            <div style={{ 
              marginTop: '50px', 
              paddingTop: '20px', 
              borderTop: '1px dashed #e2e8f0',
              fontSize: '11px',
              color: '#a0aec0',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              {disclaimer}
            </div>
          </div>
        </div>

        <div className="results-footer">
          <button className="btn-outline" onClick={onBack}>Optimize Another</button>
          <button className="btn-primary" onClick={onBackToHome} style={{ border: 'none', cursor: 'pointer' }}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;
