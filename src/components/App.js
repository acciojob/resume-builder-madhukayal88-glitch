import React from 'react';
import { useSelector } from 'react-redux';
import Profile from './components/Profile';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import SocialMedia from './components/SocialMedia';
import ResumePreview from './components/ResumePreview';
import Navigation from './components/Navigation';
import './styles.css';

function App() {
  const currentPage = useSelector(state => state.currentPage);

  const renderPage = () => {
    switch(currentPage) {
      case 1:
        return <Profile />;
      case 2:
        return <Education />;
      case 3:
        return <Skills />;
      case 4:
        return <Projects />;
      case 5:
        return <SocialMedia />;
      case 6:
        return <ResumePreview />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="app-container">
      <h1>📄 Resume Builder</h1>
      <p className="subtitle">Build your professional resume step by step</p>
      
      <div className="progress-bar">
        <div className="steps">
          <span className={currentPage >= 1 ? 'active' : ''}>Profile</span>
          <span className={currentPage >= 2 ? 'active' : ''}>Education</span>
          <span className={currentPage >= 3 ? 'active' : ''}>Skills</span>
          <span className={currentPage >= 4 ? 'active' : ''}>Projects</span>
          <span className={currentPage >= 5 ? 'active' : ''}>Social</span>
          <span className={currentPage >= 6 ? 'active' : ''}>Preview</span>
        </div>
        <div className="progress-indicator">
          Step {currentPage} of 6
        </div>
      </div>

      <div className="page-container">
        {renderPage()}
      </div>

      <Navigation />
    </div>
  );
}

export default App;
