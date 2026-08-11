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

  return (
    <div className="app">
      <h1>📄 Resume Builder</h1>
      <div className="progress">
        <span className={page >= 1 ? 'active' : ''}>Profile</span>
        <span className={page >= 2 ? 'active' : ''}>Education</span>
        <span className={page >= 3 ? 'active' : ''}>Skills</span>
        <span className={page >= 4 ? 'active' : ''}>Projects</span>
        <span className={page >= 5 ? 'active' : ''}>Social</span>
        <span className={page >= 6 ? 'active' : ''}>Preview</span>
      </div>
      
      <div className="page">
        {page === 1 && <Profile />}
        {page === 2 && <Education />}
        {page === 3 && <Skills />}
        {page === 4 && <Projects />}
        {page === 5 && <SocialMedia />}
        {page === 6 && <ResumePreview />}
      </div>
      
      <Navigation />
    </div>
  );
}

export default App;
