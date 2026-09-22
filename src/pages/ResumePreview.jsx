import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ResumePreview() {
  const { profile, education, skills, projects, social } = useSelector((s) => s);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 30 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 30, borderRadius: 8 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 5 }}>{profile.fname} {profile.lname}</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          {profile.phone} | {profile.address} | {profile.url}
        </p>

        <h3 style={{ borderBottom: '2px solid #e91e63', paddingBottom: 5 }}>Education</h3>
        {education.entries.map((e) => (
          <div key={e.id} style={{ marginBottom: 10 }}>
            <strong>{e.courseName}</strong> — {e.college} ({e.completionYear}) — {e.percentage}%
          </div>
        ))}

        <h3 style={{ borderBottom: '2px solid #e91e63', paddingBottom: 5 }}>Skills</h3>
        <ul>{skills.skills.map((s) => <li key={s.id}>{s.skill}</li>)}</ul>

        <h3 style={{ borderBottom: '2px solid #e91e63', paddingBottom: 5 }}>Projects</h3>
        {projects.projects.map((p) => (
          <div key={p.id} style={{ marginBottom: 10 }}>
            <strong>{p.projectName}</strong> — <em>{p.techStack}</em>
            <p>{p.description}</p>
          </div>
        ))}

        <h3 style={{ borderBottom: '2px solid #e91e63', paddingBottom: 5 }}>Social</h3>
        <ul>{social.social.map((s) => <li key={s.id}>{s.Social}</li>)}</ul>

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button onClick={() => navigate('/')} style={{ background: '#e91e63', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' }}>
            EDIT RESUME
          </button>
        </div>
      </div>
    </div>
  );
}
