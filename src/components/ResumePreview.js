import React from 'react';
import { useSelector } from 'react-redux';

function ResumePreview() {
  const profile = useSelector(state => state.profile);
  const education = useSelector(state => state.education);
  const skills = useSelector(state => state.skills);
  const projects = useSelector(state => state.projects);
  const social = useSelector(state => state.social);

  return (
    <div className="page-content">
      <h2>📄 Resume Preview</h2>
      
      <div className="resume-preview">
        <div className="resume-header">
          <h1>{profile.fname} {profile.lname}</h1>
          <div className="resume-contact">
            <span>📞 {profile.phone}</span>
            <span>📍 {profile.address}</span>
            {profile.url && <span>🔗 <a href={profile.url} target="_blank" rel="noopener noreferrer">{profile.url}</a></span>}
          </div>
        </div>

        <div className="resume-section">
          <h3>🎓 Education</h3>
          {education.length === 0 ? (
            <p>No education added</p>
          ) : (
            education.map((edu, index) => (
              <div key={index} className="resume-item">
                <h4>{edu.courseName}</h4>
                <p>{edu.college} ({edu.completionYear})</p>
                <p className="resume-percentage">{edu.percentage}</p>
              </div>
            ))
          )}
        </div>

        <div className="resume-section">
          <h3>🛠️ Skills</h3>
          {skills.length === 0 ? (
            <p>No skills added</p>
          ) : (
            <div className="resume-skills">
              {skills.map((skill, index) => (
                <span key={index} className="resume-skill-tag">{skill}</span>
              ))}
            </div>
          )}
        </div>

        <div className="resume-section">
          <h3>📁 Projects</h3>
          {projects.length === 0 ? (
            <p>No projects added</p>
          ) : (
            projects.map((project, index) => (
              <div key={index} className="resume-item">
                <h4>{project.projectName}</h4>
                <p className="resume-tech"><strong>Tech:</strong> {project.techStack}</p>
                <p>{project.description}</p>
              </div>
            ))
          )}
        </div>

        <div className="resume-section">
          <h3>🔗 Social Media</h3>
          {social.length === 0 ? (
            <p>No social links added</p>
          ) : (
            social.map((link, index) => (
              <div key={index} className="resume-item">
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
