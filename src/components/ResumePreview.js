import React from 'react';
import { useSelector } from 'react-redux';

const ResumePreview = () => {
  const { profile, education, skills, projects, socialMedia } = useSelector(
    state => state.resume
  );

  return (
    <div className="section-container preview-section">
      <h2>Resume Preview</h2>
      
      <div className="resume-preview">
        <div className="resume-header">
          {profile.image && (
            <div className="profile-image-container">
              <img src={profile.image} alt="Profile" className="preview-profile-image" />
            </div>
          )}
          <div className="profile-info">
            <h1>{profile.fname} {profile.lname}</h1>
            {profile.phone && <p>📞 {profile.phone}</p>}
            {profile.address && <p>📍 {profile.address}</p>}
            {profile.url && <p>🔗 <a href={profile.url} target="_blank" rel="noopener noreferrer">{profile.url}</a></p>}
          </div>
        </div>

        {education.length > 0 && (
          <div className="resume-section">
            <h3>Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="resume-item">
                <h4>{edu.courseName}</h4>
                <p><strong>College:</strong> {edu.college}</p>
                <p><strong>Year:</strong> {edu.completionYear}</p>
                <p><strong>Percentage:</strong> {edu.percentage}%</p>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="resume-section">
            <h3>Skills</h3>
            <div className="skills-preview">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag-preview">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="resume-section">
            <h3>Projects</h3>
            {projects.map((project, index) => (
              <div key={index} className="resume-item">
                <h4>{project.projectName}</h4>
                <p><strong>Tech Stack:</strong> {project.techStack}</p>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {socialMedia.length > 0 && (
          <div className="resume-section">
            <h3>Social Media</h3>
            {socialMedia.map((social, index) => (
              <div key={index} className="social-preview">
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.platform}: {social.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
