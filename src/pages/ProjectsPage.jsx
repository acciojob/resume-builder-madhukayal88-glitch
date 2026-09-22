import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProject, updateProject, deleteProject } from '../features/projects/projectsSlice';
import ProgressBar from '../components/ProgressBar';

export default function ProjectsPage() {
  const { projects } = useSelector((s) => s.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <Header />
      <ProgressBar current={4} />
      <div style={cardStyle}>
        <h3 style={{ textAlign: 'center' }}>Add your Mini Projects</h3>
        {projects.map((p) => (
          <div key={p.id} style={{ marginBottom: 20, padding: 15, border: '1px solid #eee', borderRadius: 6 }}>
            <div style={rowStyle}>
              <input name="projectName" placeholder="Project Name*" value={p.projectName} onChange={(e) => dispatch(updateProject({ id: p.id, field: 'projectName', value: e.target.value }))} style={inputStyle} />
              <input name="techStack" placeholder="Tech Stack" value={p.techStack} onChange={(e) => dispatch(updateProject({ id: p.id, field: 'techStack', value: e.target.value }))} style={inputStyle} />
              <input name="description" placeholder="Description" value={p.description} onChange={(e) => dispatch(updateProject({ id: p.id, field: 'description', value: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button id="delete" onClick={() => dispatch(deleteProject(p.id))} style={whiteBtn}>DELETE</button>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <button id="add_project" onClick={() => dispatch(addProject())} style={purpleBtn}>ADD PROJECT</button>
        </div>
        <div style={btnRow}>
          <button id="back" onClick={() => navigate('/skills')} style={whiteBtn}>BACK</button>
          <button id="next" onClick={() => navigate('/social')} style={pinkBtn}>NEXT</button>
          <button id="save_continue" onClick={() => navigate('/social')} style={pinkBtn}>SAVE AND CONTINUE</button>
        </div>
      </div>
    </div>
  );
}

const pageStyle = { minHeight: '100vh', background: '#f5f5f5' };
const cardStyle = { background: '#fff', padding: 30, maxWidth: 800, margin: '20px auto', borderRadius: 8 };
const rowStyle = { display: 'flex', gap: 20, marginBottom: 15 };
const inputStyle = { flex: 1, padding: 12, border: '1px solid #ccc', borderRadius: 4 };
const btnRow = { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 };
const pinkBtn = { background: '#e91e63', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const whiteBtn = { background: '#fff', color: '#333', border: '1px solid #ccc', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const purpleBtn = { background: '#3b5bdb', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };

function Header() {
  return <div style={{ background: '#e91e63', color: '#fff', padding: 20, textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>RESUME GENERATOR</div>;
}
