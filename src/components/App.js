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
  const page = useSelector(state => state.page);

  const renderPage = () => {
    switch(page) {
      case 1: return <Profile />;
      case 2: return <Education />;
      case 3: return <Skills />;
      case 4: return <Projects />;
      case 5: return <SocialMedia />;
      case 6: return <ResumePreview />;
      default: return <Profile />;
    }
  };

  return (
    <div className="app">
      <h1>📄 Resume Builder</h1>
      <div className="steps">
        <span className={page === 1 ? 'active' : ''}>Profile</span>
        <span className={page === 2 ? 'active' : ''}>Education</span>
        <span className={page === 3 ? 'active' : ''}>Skills</span>
        <span className={page === 4 ? 'active' : ''}>Projects</span>
        <span className={page === 5 ? 'active' : ''}>Social</span>
        <span className={page === 6 ? 'active' : ''}>Preview</span>
      </div>
      <div className="content">{renderPage()}</div>
      <Navigation />
    </div>
  );
}

export default App;
