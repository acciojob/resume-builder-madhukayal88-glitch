import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSkill, updateSkill, deleteSkill } from '../features/skills/skillsSlice';
import ProgressBar from '../components/ProgressBar';

export default function SkillsPage() {
  const { skills } = useSelector((s) => s.skills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <Header />
      <ProgressBar current={3} />
      <div style={cardStyle}>
        <h3 style={{ textAlign: 'center' }}>Add Your Skills</h3>
        {skills.map((s) => (
          <div key={s.id} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <input name="skill" placeholder="Skill" value={s.skill} onChange={(e) => dispatch(updateSkill({ id: s.id, value: e.target.value }))} style={inputStyle} />
            <button id="delete_skill" onClick={() => dispatch(deleteSkill(s.id))} style={whiteBtn}>DELETE</button>
          </div>
        ))}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button id="add_skill" onClick={() => dispatch(addSkill())} style={purpleBtn}>ADD SKILL</button>
        </div>
        <div style={btnRow}>
          <button id="back" onClick={() => navigate('/education')} style={whiteBtn}>BACK</button>
          <button id="next" onClick={() => navigate('/projects')} style={pinkBtn}>NEXT</button>
          <button id="save_continue" onClick={() => navigate('/projects')} style={pinkBtn}>SAVE AND CONTINUE</button>
        </div>
      </div>
    </div>
  );
}

const pageStyle = { minHeight: '100vh', background: '#f5f5f5' };
const cardStyle = { background: '#fff', padding: 30, maxWidth: 800, margin: '20px auto', borderRadius: 8 };
const inputStyle = { flex: 1, padding: 12, border: '1px solid #ccc', borderRadius: 4 };
const btnRow = { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 };
const pinkBtn = { background: '#e91e63', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const whiteBtn = { background: '#fff', color: '#333', border: '1px solid #ccc', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };
const purpleBtn = { background: '#3b5bdb', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' };

function Header() {
  return <div style={{ background: '#e91e63', color: '#fff', padding: 20, textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>RESUME GENERATOR</div>;
}
