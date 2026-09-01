import React from 'react';
import { useSelector } from 'react-redux';
import './styles/App.css';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import SocialMedia from './components/SocialMedia';
import ResumePreview from './components/ResumePreview';

function App() {
  const currentPage = useSelector(state => state.resume.currentPage);
  const totalPages = 6; // 5 sections + preview

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <Profile />;
      case 1:
        return <Education />;
      case 2:
        return <Skills />;
      case 3:
        return <Projects />;
      case 4:
        return <SocialMedia />;
      case 5:
        return <ResumePreview />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Resume Builder</h1>
      </header>
      <main className="app-main">
        <div className="page-container">
          <div className="page-indicator">
            Page {currentPage + 1} of {totalPages}
          </div>
          {renderPage()}
          <Navigation totalPages={totalPages} />
        </div>
      </main>
    </div>
  );
}

export default App;
